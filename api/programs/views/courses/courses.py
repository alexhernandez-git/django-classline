"""Course views."""

# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
import os
import stripe

from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer,
    CouponModelSerializer,
    UserModelSerializer
)

from api.programs.serializers import (
    CourseModelSerializer,
    CourseCreateSerializer,
    CourseModifyModelSerializer,
    CoursePriceModelSerializer,
    CourseLanguageModelSerializer,
    AddStudentCourseSerializer,
    PublishCourseSerializer,
    CancelPublishCourseSerializer,
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
from api.programs.models import Course, Video, Podcast
from api.users.models import User, Subscription, Teacher, Profile, Coupon, PurchasedItem

# Utils
from api.utils.permissions import AddProgramMixin


class CourseViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.DestroyModelMixin,
                  AddProgramMixin):
    """Course view set."""

    serializer_class = CourseModelSerializer
    lookup_field = 'code'
    search_fields = ('title', 'description')
    filter_backends = [SearchFilter]

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = Course.objects.filter(program=self.program)
        if self.action in ['list']:
            queryset = Course.objects.filter(
                program=self.program)
        if self.action in ['list_program_courses']:
            queryset = Course.objects.filter(
               program=self.program, published_in_program=True)
        if self.action in ['list_published_courses']:
            queryset = Course.objects.filter(
                program=self.program, published=True)

        return queryset

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'create':
            return CourseCreateSerializer
        if self.action in ['update', 'partial_update', 'get_accounts', 'cancel_accounts']:
            return CourseModifyModelSerializer
        elif self.action == 'publish':
            return PublishCourseSerializer
        elif self.action == 'cancel_publish':
            return CancelPublishCourseSerializer
        elif self.action == 'publish_in_program':
            return PublishCourseSerializer
        elif self.action == 'cancel_publish_in_program':
            return CancelPublishCourseSerializer
        return CourseModelSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ['update', 'partial_update', 'delete', 'list_my_courses']:
            permissions.append(IsAuthenticated)
        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def list_program_courses(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def list_published_courses(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'])
    def list_my_courses(self, request, *args, **kwargs):

        queryset = Course.objects.filter(students=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put', 'patch'])
    def language(self, request, *args, **kwargs):
        """Update profile data."""
        course = self.get_object()

        serializer = CourseLanguageModelSerializer(
            data=request.data,
            context={'request': request, 'course': course}
        )
        serializer.is_valid(raise_exception=True)
        language = serializer.save()

        data = CourseLanguageModelSerializer(language).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def publish_in_program(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'
        serializer = serializer_class(
            course,
            data=request.data,
            partial=partial,
            context={"publish_in_program": True}

        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModifyModelSerializer(course).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def cancel_publish_in_program(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            course,
            data=request.data,
            partial=partial,
            context={"publish_in_program": True}
        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModifyModelSerializer(course).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def publish(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            course,
            data=request.data,
            partial=partial,
            context={"publish_in_program": False}

        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModifyModelSerializer(course).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def cancel_publish(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            course,
            data=request.data,
            partial=partial,
            context={"publish_in_program": False}

        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModifyModelSerializer(course).data
        return Response(data)

    @action(detail=True, methods=['get'])
    def list_students(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            User.objects.filter(course_user__pk=kwargs['id']))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



    @action(detail=True, methods=['patch'])
    def buy_course(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        course = self.get_object()
        program = self.program

        user = request.user
        profile = user.profile

        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        customer_id = ''
        if Course.objects.filter(
            students=user
        ) == course:
            return Response({'message': 'Ya has comprado este curso'}, status=status.HTTP_400_BAD_REQUEST)

        course_info = course

        serialised_course = CourseModelSerializer(
            course_info, many=False).data

        purchased_product = stripe.Product.create(
            name=serialised_course.get('title'))
        price = stripe.Price.create(
            currency=serialised_course.get('course_price').get('type'),
            product=purchased_product.get('id'),
            nickname=serialised_course.get('description'),
            unit_amount=int(serialised_course.get(
                'course_price').get('value')*100),
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
                "destination": serialised_course.get('instructor').get('profile').get('stripe_account_id'),
            },
            application_fee_amount=int(serialised_course.get(
                'course_price').get('value')*100 * 25/100),
        )

        stripe.Invoice.pay(invoice['id'])
        new_purchased_item = PurchasedItem.objects.create(
            invoice_item_id=invoice_item['id'],
            invoice_id=invoice['id'],
            user=user,
            course=course,
            program=program,
            payment_issue=False,
            is_student_purchased_course=True
        )
        profile.purchased_items.add(
            new_purchased_item
        )
        profile.save()

        serializer = AddStudentCourseSerializer(
            course,
            data=request.data,
            context={'user': user, 'request': request},
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        course = serializer.save()
        data = CourseModelSerializer(course, many=False).data

        return Response(data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        course = self.get_object()
        students = course.students.all().count()
        if students > 0:
            return Response(data={'message': "No puedes eliminar un curso con alumnos"},
                            status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(course)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            course,
            data=request.data,
            context={
                'benefits': request.data.get('benefits'),
                'price': request.data.get('course_price'),
                'language': request.data.get('course_language'),
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModelSerializer(course).data
        return Response(data)

    @action(detail=True, methods=['patch'])
    def update_blocks(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            course,
            data=request.data,
            context={
                'tracks': request.data['tracks'],
                'course': course,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        course = serializer.save()

        data = CourseModelSerializer(course).data
        return Response(data)

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
        course = serializer.save()

        data = CourseModelSerializer(course, many=False).data
        return Response(data, status=status.HTTP_201_CREATED)
