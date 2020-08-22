"""Program views."""

# Django REST Framework
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
from api.programs.models import Program
from api.users.models import User, Subscription, Teacher, Profile, Coupon

# Serializers
from api.programs.serializers import (
    ProgramModelSerializer,
    ProgramModifyModelSerializer,
    ProgramListModelSerializer,
    ProgramPriceModelSerializer,
    ProgramLanguageModelSerializer,
    ActiveProgramSerializer,
    AddStudentProgramSerializer,
    ProgramCreateModelSerializer,
    AddAccountsSerializer,
    CancelAccountsSerializer,
    PublishProgramSerializer,
    CancelPublishProgramSerializer,
    CancelActiveProgramSerializer,

)

from api.users.serializers.subscriptions import(
    SubscriptionSignUpSerializer
)

from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer,
    AccountsSubscriptionSignUpSerializer,
    AccountsSubscriptionModelSerializer,
    CouponModelSerializer
)


import stripe
import os


class ProgramViewSet(mixins.CreateModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    """Circle view set."""

    serializer_class = ProgramModelSerializer
    lookup_field = 'code'
    search_fields = ('title', 'subtitle', 'description')
    filter_backends = [SearchFilter]

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = Program.objects.all()
        if self.action in ['list']:
            queryset = Program.objects.filter(actived=True)

        return queryset

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'create':
            return ProgramCreateModelSerializer
        if self.action in ['update', 'partial_update', 'get_accounts', 'cancel_accounts']:
            return ProgramModifyModelSerializer
        elif self.action == 'list':
            return ProgramListModelSerializer
        elif self.action == 'list_students':
            return UserWithoutTeacherModelSerializer
        elif self.action == 'retrieve':
            return ProgramModelSerializer
        elif self.action == 'active':
            return ActiveProgramSerializer
        elif self.action == 'publish':
            return PublishProgramSerializer
        elif self.action == 'cancel_active':
            return CancelActiveProgramSerializer
        elif self.action == 'cancel_publish':
            return CancelPublishProgramSerializer
        return ProgramModelSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ['update', 'partial_update', 'delete', 'list_my_programs']:
            permissions.append(IsAuthenticated)
        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def list_my_programs(self, request, *args, **kwargs):
        if request.GET['search']:
            search = request.GET['search']
            queryset = Program.objects.filter(
                students=request.user, title=search, subtitle=search, description=search)
        else:
            queryset = Program.objects.filter(students=request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['put', 'patch'])
    def language(self, request, *args, **kwargs):
        """Update profile data."""
        program = self.get_object()

        serializer = ProgramLanguageModelSerializer(
            data=request.data,
            context={'request': request, 'program': program}
        )
        serializer.is_valid(raise_exception=True)
        price = serializer.save()

        data = ProgramLanguageModelSerializer(price).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def active(self, request, *args, **kwargs):
        program = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            program,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        program = serializer.save()

        data = ProgramModifyModelSerializer(program).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def cancel_active(self, request, *args, **kwargs):
        program = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            program,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        program = serializer.save()

        data = ProgramModifyModelSerializer(program).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def publish(self, request, *args, **kwargs):
        program = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            program,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        program = serializer.save()

        data = ProgramModifyModelSerializer(program).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def cancel_publish(self, request, *args, **kwargs):
        program = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            program,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        program = serializer.save()

        data = ProgramModifyModelSerializer(program).data
        return Response(data)

    @action(detail=True, methods=['get'])
    def list_students(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            User.objects.filter(program_user__pk=kwargs['id']))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def add_student(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.get_object()
        user = request.user
        profile = user.profile
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        customer_id = ''
        if Program.objects.filter(
            students=user
        ) == program:
            return Response({'message': 'Ya estas suscrito a este programa'}, status=status.HTTP_400_BAD_REQUEST)

        program_info = program

        serialised_program = ProgramModelSerializer(
            program_info, many=False).data

        subscription_product = stripe.Product.create(
            name=serialised_program.get('title'))
        price = stripe.Price.create(
            currency=serialised_program.get('program_price').get('type'),
            recurring={
                'interval': 'month',
            },
            product=subscription_product.get('id'),
            nickname=serialised_program.get('description'),
            unit_amount=int(serialised_program.get(
                'program_price').get('value')*100),
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

        subscription = stripe.Subscription.create(
            customer=customer_id,
            items=[
                {
                    "price": price.id,
                },
            ],
            expand=["latest_invoice.payment_intent"],
            application_fee_percent=program.user.teacher.application_fee_percent,
            transfer_data={
                "destination": serialised_program.get('instructor').get('profile').get('stripe_account_id'),
            },
        )

        new_subscription = Subscription(
            subscription_id=subscription.id,
            user=user.code,
            program=program.code,
            to_be_cancelled=False,
            cancelled=False,
            payment_issue=False,
            current_period_end=subscription.current_period_end
        )
        new_subscription.save()
        profile.subscriptions.add(
            new_subscription
        )
        profile.save()

        serializer = AddStudentProgramSerializer(
            program,
            data=request.data,
            context={'user': user, 'request': request},
            partial=True
        )

        serializer.is_valid(raise_exception=True)
        program = serializer.save()
        data = ProgramModifyModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'])
    def remove_student(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.get_object()
        user = request.user
        profile = user.profile

        # user = User.objects.get(pk=self.kwargs['pk'])
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        # try:
        #     cancel_subscription = Subscription.objects.get(user=request.user.code, program=program.code)
        #     if cancel_subscription:
        #         stripe.Subscription.modify(
        #             cancel_subscription.subscription_id,
        #             cancel_at_period_end=True
        #         )
        #         cancel_subscription.to_be_cancelled = True
        #         cancel_subscription.save()
        # except:
        #     pass
        cancel_subscription = profile.subscriptions.filter(
            user=request.user.code, program=program.code, active=True)[0]

        if cancel_subscription:
            subscription_deleted = stripe.Subscription.delete(
                cancel_subscription.subscription_id,
                prorate=False,
                invoice_now=True
            )
            if not profile.subscriptions.filter(user=request.user.code, program=program.code, active=False).exists():

                invoice = stripe.Invoice.retrieve(
                    subscription_deleted['latest_invoice'])
                if invoice['amount_paid'] >= 1:
                    stripe.CreditNote.create(
                        invoice=invoice.id,
                        lines=[
                            {
                                "type": "invoice_line_item",
                                "invoice_line_item": invoice['lines']['data'][0]['id'],
                                "quantity": "1"
                            }
                        ],
                        refund_amount=str(invoice['amount_paid'])
                    )

            student = User.objects.get(code=cancel_subscription.user)
            program = Program.objects.get(code=cancel_subscription.program)
            program.students.remove(student)
            cancel_subscription.active = False
            cancel_subscription.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['patch'])
    def restore_subscription(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.get_object()
        user = request.user
        profile = user.profile

        # user = User.objects.get(pk=self.kwargs['pk'])
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        try:
            cancel_subscription = Profile.objects.filter(
                user=request.user.code, program=program.code, active=True)[0]
            if cancel_subscription:
                stripe.Subscription.modify(
                    cancel_subscription.subscription_id,
                    cancel_at_period_end=False
                )
                cancel_subscription.to_be_cancelled = False
                cancel_subscription.save()
        except:
            pass

        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def add_accounts(self, request, *args, **kwargs):
        program = self.get_object()
        user = request.user
        profile = user.profile
        teacher = user.teacher
        product = request.data['accounts_acquired']
        promotion_code = None
        if "promotion_code" in request.data:
            promotion_code = request.data['promotion_code']

        discount = None
        if "discount" in request.data:
            discount = request.data['discount']
        serialised_program = ProgramModelSerializer(program, many=False).data
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        customer_id = ''
        # Validation

        if product == None:
            return Response({'message': 'No hay ningun pricing'}, status=status.HTTP_400_BAD_REQUEST)

        accounts_already_created = program.created_accounts.all().count()

        if accounts_already_created > int(product['accounts']):
            return Response({'message': 'Tienes más de {} cuentas creadas'.format(product['accounts'])}, status=status.HTTP_400_BAD_REQUEST)
        # End validation

        try:
            if discount and not teacher.discount:
                discount = {
                    'coupon_id': "50_OFF",
                    'percent_off': 50,
                    'duration': "forever"
                }
                teacher.discount = Coupon.objects.create(
                    **discount)
                teacher.save()

            # payment_method = stripe.PaymentMethod.retrieve(
            # request.data['payment_method_id'],
            # )
            if profile.stripe_customer_id == None or profile.stripe_customer_id == '':
                newCustomer = stripe.Customer.create(
                    description="claCustomer_"+user.first_name+'_'+user.last_name,
                    name=user.first_name+' '+user.last_name,
                    email=user.email,
                    payment_method=request.data.get('payment_method_id'),
                    invoice_settings={
                        "default_payment_method": request.data.get('payment_method_id')
                    }

                )
                # if User.objects.filter(profile__stripe_customer_id=, subscription_type="accounts-subscription", ).exists():

                #     pass
                stripe.PaymentMethod.attach(
                    request.data.get('payment_method_id'),
                    customer=newCustomer.id,
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
                    request.data.get('payment_method_id'),
                    customer=customer_id,
                )
                stripe.Customer.modify(
                    customer_id,
                    invoice_settings={
                        "default_payment_method": request.data.get('payment_method_id')
                    },
                )

            if teacher.subscriptions.filter(user=program.user.code, program=program.code, active=True).exists():
                accounts_subscription = teacher.subscriptions.filter(
                    user=program.user.code, program=program.code, active=True)[0]
                subscription = stripe.Subscription.retrieve(
                    accounts_subscription.subscription_id)
                # upcoming_invoice = stripe.Invoice.upcoming(customer=customer_id)
                # import pdb; pdb.set_trace()
                # stripe.InvoiceItem.delete(
                #     upcoming_invoice['lines']['data'][0].invoice_item,
                # )

                subscription_to_modify = stripe.Subscription.retrieve(
                    subscription.id)
                if subscription_to_modify['discount']:
                    stripe.Subscription.delete_discount(subscription.id)

                if request.data['accounts_acquired']['level_pro']:
                    if teacher.discount:
                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],

                            coupon=teacher.discount.coupon_id
                        )
                    elif promotion_code:
                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],
                            promotion_code=promotion_code["promotion_code_id"]
                        )
                    else:
                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],

                            promotion_code=None
                        )
                else:
                    if teacher.discount:

                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    'price':  request.data['accounts_acquired']['price_id'],
                                }
                            ],
                            coupon=teacher.discount.coupon_id
                        )
                    elif promotion_code:
                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    'price':  request.data['accounts_acquired']['price_id'],
                                }
                            ],
                            promotion_code=promotion_code["promotion_code_id"]

                        )
                    else:
                        subscription_modified = stripe.Subscription.modify(
                            subscription.id,
                            cancel_at_period_end=False,
                            prorate=False,
                            items=[
                                {
                                    'id': subscription['items']['data'][0].id,
                                    'price':  request.data['accounts_acquired']['price_id'],
                                }
                            ],
                        )
                teacher_subscription = Subscription.objects.get(
                    subscription_id=subscription.id, active=True)
                teacher_subscription.subscription_id = subscription.id
                teacher_subscription.user = user.code
                teacher_subscription.program = program.code
                teacher_subscription.product = product['id']
                teacher_subscription.to_be_cancelled = False
                teacher_subscription.payment_issue = False
                teacher_subscription.current_period_end = subscription.current_period_end
                teacher_subscription.save()
                teacher.save()

            else:

                # Create the subscription

                if request.data['accounts_acquired']['level_pro']:

                    if teacher.discount:

                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],
                            coupon=teacher.discount.coupon_id,
                            trial_period_days="14",

                        )

                    elif promotion_code:
                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],
                            promotion_code=promotion_code["promotion_code_id"],
                            trial_period_days="14",

                        )
                    else:
                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                    "quantity":request.data['accounts_acquired']['accounts']
                                },
                            ],
                            trial_period_days="14",
                        )
                else:

                    if teacher.discount:

                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                },
                            ],
                            coupon=teacher.discount.coupon_id,
                            trial_period_days="14",

                        )
                    elif promotion_code:
                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                },
                            ],
                            promotion_code=promotion_code["promotion_code_id"],
                            trial_period_days="14",

                        )
                    else:
                        subscription = stripe.Subscription.create(
                            customer=customer_id,
                            items=[
                                {
                                    "price": request.data['accounts_acquired']['price_id'],
                                },
                            ],
                            trial_period_days="14",

                        )

                sub = Subscription.objects.create(
                    subscription_id=subscription.id,
                    user=user.code,
                    program=program.code,
                    product=product['id'],
                    to_be_cancelled=False,
                    cancelled=False,
                    payment_issue=False,
                    current_period_end=subscription.current_period_end
                )
                teacher.subscriptions.add(sub)
                teacher.save()

        except Exception as e:
            print(str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer_class = self.get_serializer_class()
        partial = request.method == 'PATCH'
        serializer = AddAccountsSerializer(
            program,
            data=request.data,
            context={
                'accounts_acquired': request.data['accounts_acquired'],
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()
        data = ProgramModifyModelSerializer(program, many=False).data
        payment_methods = stripe.PaymentMethod.list(
            customer=customer_id,
            type="card"
        )
        response_data = {
            'program': data,
            'customer_id': customer_id,
            'payment_methods': payment_methods.data
        }
        if teacher.discount:
            response_data['discount'] = CouponModelSerializer(
                teacher.discount, many=False).data

        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def cancel_accounts(self, request, *args, **kwargs):

        user = request.user
        teacher = user.teacher

        program = self.get_object()
        if program.created_accounts.count() > 0:
            return Response({'message': 'Borra tus cuentas creadas para cancelar'}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_serializer_class()
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        partial = request.method == 'PATCH'

        serializer = CancelAccountsSerializer(
            program,
            data=request.data,
            context={'program': program},
            partial=partial
        )
        # if teacher.discount:
        #     teacher.discount.delete()
        serializer.is_valid(raise_exception=True)
        if teacher.subscriptions.filter(user=program.user.code, program=program.code, active=True).exists():
            try:
                accounts_subscription = teacher.subscriptions.filter(
                    user=program.user.code, program=program.code, active=True)[0]
                subscription_deleted = stripe.Subscription.delete(
                    accounts_subscription.subscription_id)
                accounts_subscription.active = False
                accounts_subscription.save()

            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        program = serializer.save()
        data = ProgramModifyModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def are_discount(self, request, *args, **kwargs):
        if Teacher.subscriptions.through.objects.filter(subscription__active=True).count() <= 10:
            return Response(
                {
                    "title": "¡Oferta limitada para academias por el lanzamiento de la plataforma!",
                    "message": "50% de descuento para siempre al adquirir cualquier plan de cuentas de usuario",
                    "info": "Cuando la cuenta de instructor adquiera cualquier plan se le asignará el descuento de por vida",
                    "percent_off": 50,
                    "is_discount": True,
                }, status=status.HTTP_200_OK
            )
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        program = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            program,
            data=request.data,
            context={
                'benefits': request.data.get('benefits'),
                'price': request.data.get('program_price'),
                'language': request.data.get('program_language'),
                'events': request.data.get('events')
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        program = serializer.save()

        data = serializer_class(program).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""
        serializer_class = self.get_serializer_class()

        serializer = serializer_class(
            data=request.data,
            context={
                'language': request.data.get('language'),
                'request': request
            },
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = serializer_class(program, many=False).data
        return Response(data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        program = self.get_object()
        students = program.students.all().count()
        if students > 0:
            return Response(data={'message': "No puedes eliminar una academia con alumnos"},
                            status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(program)

        return Response(status=status.HTTP_204_NO_CONTENT)
