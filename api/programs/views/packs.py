"""Pack views."""

# Django REST Framework
import os
import stripe
from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer,
    CouponModelSerializer,
    AddInstructorAccountsSerializer,
    CancelInstructorAccountsSerializer,
    UserModelSerializer
)

from api.programs.serializers import (
    PackModelSerializer,
    PackCreateSerializer,
    PackModifyModelSerializer,
    PackPriceModelSerializer,
    PackLanguageModelSerializer,
    AddStudentPackSerializer,
    PublishPackSerializer,
    CancelPublishPackSerializer,
)
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
# Permissions
from rest_framework.permissions import IsAuthenticated

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


# Models
from api.programs.models import Pack
from api.users.models import User, Subscription, Teacher, Profile, Coupon, PurchasedItem

# Utils
from api.utils.permissions import AddProgramMixin


class PackViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  AddProgramMixin):
    """Pack view set."""

    serializer_class = PackModelSerializer
    lookup_field = 'code'
    search_fields = ('title', 'description')
    filter_backends = [SearchFilter]

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = Pack.objects.filter(program=self.program)
        if self.action in ['list']:
            queryset = Pack.objects.filter(
                program=self.program, published=True)

        return queryset

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'create':
            return PackCreateSerializer
        if self.action in ['update', 'partial_update', 'get_accounts', 'cancel_accounts']:
            return PackModifyModelSerializer
        elif self.action == 'publish':
            return PublishPackSerializer
        elif self.action == 'cancel_publish':
            return CancelPublishPackSerializer
        return PackModelSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ['update', 'partial_update', 'delete', 'list_my_packs']:
            permissions.append(IsAuthenticated)
        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def list_my_packs(self, request, *args, **kwargs):
        if request.GET['search']:
            search = request.GET['search']
            queryset = Pack.objects.filter(
                students=request.user, title=search, description=search)
        else:
            queryset = Pack.objects.filter(students=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put', 'patch'])
    def language(self, request, *args, **kwargs):
        """Update profile data."""
        pack = self.get_object()

        serializer = PackLanguageModelSerializer(
            data=request.data,
            context={'request': request, 'pack': pack}
        )
        serializer.is_valid(raise_exception=True)
        language = serializer.save()

        data = PackLanguageModelSerializer(language).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def publish(self, request, *args, **kwargs):
        pack = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            pack,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        pack = serializer.save()

        data = PackModifyModelSerializer(pack).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def cancel_publish(self, request, *args, **kwargs):
        pack = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            pack,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        pack = serializer.save()

        data = PackModifyModelSerializer(pack).data
        return Response(data)

    @action(detail=True, methods=['get'])
    def list_students(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            User.objects.filter(pack_user__pk=kwargs['id']))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def add_student(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        pack = self.get_object()
        program = self.program
        user = request.user
        profile = user.profile
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        customer_id = ''
        if Pack.objects.filter(
            students=user
        ) == pack:
            return Response({'message': 'Ya estas suscrito a este pack'}, status=status.HTTP_400_BAD_REQUEST)

        pack_info = pack

        serialised_pack = PackModelSerializer(
            pack_info, many=False).data

        purchased_product = stripe.Product.create(
            name=serialised_pack.get('title'))
        price = stripe.Price.create(
            currency=serialised_pack.get('pack_price').get('type'),
            product=purchased_product.get('id'),
            nickname=serialised_pack.get('description'),
            unit_amount=int(serialised_pack.get(
                'pack_price').get('value')*100),
        )
        if profile.stripe_customer_id == None or profile.stripe_customer_id == '':
            newCustomer = stripe.Customer.create(
                description="claCustomer_"+user.first_name+'_'+user.last_name,
                name=user.first_name+' '+user.last_name,
                email=user.email,
                payment_method=request.data.get('payment_method'),
                invoice_settings={
                    "default_payment_method": request.data.get('payment_method')
                }

            )
            customer_id = newCustomer.id
            profile.stripe_customer_id = customer_id
            serializer = ProfileModelSerializer(
                profile,
                data=request.data,
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            customer_id = profile.stripe_customer_id
            stripe.PaymentMethod.attach(
                request.data.get('payment_method'),
                customer=customer_id,
            )
            stripe.Customer.modify(
                customer_id,
                invoice_settings={
                    "default_payment_method": request.data.get('payment_method')
                },
            )

        invoice_item = stripe.InvoiceItem.create(
            customer=customer_id,
            price=price.id,
        )

        invoice = stripe.Invoice.create(
            customer=customer_id,
            transfer_data={
                "destination": serialised_pack.get('instructor').get('profile').get('stripe_account_id'),
            },
            application_fee_amount=int(serialised_pack.get(
                'pack_price').get('value')*100 * 20/100),
        )

        stripe.Invoice.pay(invoice['id'])
        new_purchased_item = PurchasedItem.objects.create(
            invoice_item_id=invoice_item['id'],
            invoice_id=invoice['id'],
            user=user,
            pack=pack,
            program=program,
            to_be_cancelled=False,
            cancelled=False,
            payment_issue=False,
            is_student_purchased_pack=True
        )
        profile.purchased_items.add(
            new_purchased_item
        )
        profile.save()

        serializer = AddStudentPackSerializer(
            pack,
            data=request.data,
            context={'user': user, 'request': request},
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        pack = serializer.save()
        data = PackModelSerializer(pack, many=False).data

        return Response(data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        pack = self.get_object()
        students = pack.students.all().count()
        if students > 0:
            return Response(data={'message': "No puedes eliminar un pack con alumnos"},
                            status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(pack)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""
        serializer_class = self.get_serializer_class()

        serializer = serializer_class(
            data=request.data,
            context={
                'request': request,
                'program': self.program
            },
        )
        serializer.is_valid(raise_exception=True)
        pack = serializer.save()

        data = PackModelSerializer(pack, many=False).data
        return Response(data, status=status.HTTP_201_CREATED)
