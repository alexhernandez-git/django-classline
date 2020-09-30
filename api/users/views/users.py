"""Users views."""

# Django
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


# Django REST Framework
from api.users.models import User, Profile, Subscription, Commercial, Payment
from api.programs.models import Program, Rating, Student
import stripe
import json
import uuid
from api.users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserListTeacherModelSerializer,
    UserCustomTeacherModelSerializer,
    UserWithoutTeacherModelSerializer,
    UserSignUpSerializer,
    AccountVerificationSerializer,
    UserTeacherModelSerializer,
    UserLoginPlatformSerializer,
    ChangePasswordSerializer,
    UserLoginAppSerializer,
    ChangeEmailSerializer,
    ValidateChangeEmail,
    ForgetPasswordSerializer,
    ResetPasswordSerializer,
    CommercialsLoginSerializer,
    UserCommercialModelSerializer,
    CommercialModelSerializer,
    UserTeacherCreatedByCommercialModelSerializer,
    PaymentModelSerializer,
    DemoRequestSerializer,
    AddInstructorAccountsSerializer,
    CancelInstructorAccountsSerializer
)
from django.core.exceptions import ObjectDoesNotExist
from api.programs.serializers import AccountCreatedModelSerializer, ProgramModifyModelSerializer, InstructorModelSerializer
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.http import HttpResponse
# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)
from api.users.permissions import IsAccountOwner

# Serializers
from api.users.serializers.profiles import ProfileModelSerializer

from api.programs.serializers.ratings import RatingModelSerializer

from api.users.serializers.subscriptions import(
    SubscriptionModelSerializer
)

# Filters
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

import os


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """

    queryset = User.objects.filter(is_active=True, is_client=True)
    serializer_class = UserModelSerializer
    lookup_field = 'code'
    filter_backends = (SearchFilter,  DjangoFilterBackend)
    search_fields = ('first_name', 'last_name')

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['signup', 'login', 'login_from_platform', 'verify', 'list', 'retrieve', 'stripe_webhook_subscription_cancelled', 'login_from_app', 'forget_password', 'login_to_dashboard']:
            permissions = [AllowAny]
        elif self.action in ['update', 'delete', 'partial_update', 'change_password', 'change_email', 'validate_change_email', 'reset_password', 'create_commercial', 'create_user_by_commercial']:
            permissions = [IsAccountOwner, IsAuthenticated]

        else:
            permissions = []
        return [p() for p in permissions]

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'list_teachers':
            return UserListTeacherModelSerializer
        elif self.action == 'list':
            return UserCustomTeacherModelSerializer
        elif self.action == 'partial_update':
            return UserWithoutTeacherModelSerializer
        elif self.action == 'retrieve':
            return UserTeacherModelSerializer
        elif self.action == 'change_password':
            return ChangePasswordSerializer
        return UserModelSerializer

    @action(detail=False, methods=['post'])
    def demo_request(self, request):
        if not 'phone_number' in request.data or request.data['phone_number'] == "":
            request.data['phone_number'] = "No hay numero"
        if not 'message' in request.data or request.data['message'] == "":
            request.data['message'] = "No hay mensage"
        subject = 'Soy {} y quiero una demo para mi empresa que se llama {}!'.format(
            request.data['first_name'], request.data['company_name'])
        from_email = 'Classline Academy <no-reply@classlineacademy.com>'
        to_email = 'vlexhndz@gmail.com'
        content = render_to_string(
            'emails/users/request_demo.html',
            {
                'email': request.data['email'],
                'first_name': request.data['first_name'],
                'last_name': request.data['last_name'],
                'company_name': request.data['company_name'],
                'message': request.data['message'],
                'phone_number': request.data['phone_number'],
            }
        )

        msg = EmailMultiAlternatives(subject, content, from_email, [to_email])
        msg.attach_alternative(content, "text/html")
        msg.send()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def login(self, request):
        """User login."""
        serializer = UserLoginSerializer(
            data=request.data,

        )

        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token,
        }
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        stripe_account_id = data.get('user').get(
            'profile').get('stripe_account_id')
        stripe_customer_id = data.get('user').get(
            'profile').get('stripe_customer_id')
        if stripe_account_id != None and stripe_account_id != '':
            stripe_dashboard_url = stripe.Account.create_login_link(
                data.get('user').get('profile').get('stripe_account_id')
            )
            data['user']['profile']['stripe_dashboard_url'] = stripe_dashboard_url['url']

        if stripe_customer_id != None and stripe_customer_id != '':
            payment_methods = stripe.PaymentMethod.list(
                customer=stripe_customer_id,
                type="card"
            )
            data['user']['profile']['payment_methods'] = payment_methods.data
        else:
            data['user']['profile']['payment_methods'] = None
        # subscriptions = user.profile.subscriptions

        # serialized_subscriptions = SubscriptionModelSerializer(
        #     subscriptions, many=True)
        # data['user']['subscriptions'] = serialized_subscriptions.data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def login_from_platform(self, request, *args, **kwargs):
        """User login."""

        program = get_object_or_404(
            Program,
            code=kwargs['code']
        )

        serializer = UserLoginPlatformSerializer(
            data=request.data,
            context={'program': program}
        )

        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        user_data = UserModelSerializer(user, many=False).data
        stripe_customer_id = user_data.get(
            'profile').get('stripe_customer_id')

        if stripe_customer_id != None and stripe_customer_id != '':
            payment_methods = stripe.PaymentMethod.list(
                customer=stripe_customer_id,
                type="card"
            )
            user_data['profile']['payment_methods'] = payment_methods.data
        else:
            user_data['profile']['payment_methods'] = None
        try:
            rating = Rating.objects.get(
                rated_program=program, rating_user=user)
            data = {
                'user': user_data,
                'access_token': token,
                'rating': RatingModelSerializer(rating, many=False).data
            }
        except ObjectDoesNotExist:
            data = {
                'user':  UserModelSerializer(user, many=False).data,
                'access_token': token,
                'rating': None
            }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login_from_app(self, request, *args, **kwargs):
        """User login."""

        serializer = UserLoginAppSerializer(
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user, many=False).data,
            'access_token': token,
        }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login_to_dashboard(self, request, *args, **kwargs):
        """User login."""

        serializer = CommercialsLoginSerializer(
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserCommercialModelSerializer(user, many=False).data,
            'access_token': token,
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def change_password(self, request):
        """User login."""
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'new_password': request.data['new_password'],
                     'repeat_password': request.data['repeat_password']}
        )

        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def forget_password(self, request):
        """User login."""
        serializer = ForgetPasswordSerializer(
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def change_email(self, request):
        """Account verification."""

        serializer = ChangeEmailSerializer(
            data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def reset_password(self, request):
        """Account verification."""
        serializer = ResetPasswordSerializer(
            data=request.data, context={'user': request.user, 'confirm_password': request.data['confirm_password']})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        """User sign up."""
        request.data['created_account'] = False

        request.data['username'] = request.data['email']

        serializer = UserSignUpSerializer(
            data=request.data, context={'are_program': False, 'create_instructor': False, 'create_commercial': False, 'create_user_by_commercial': False})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def create_account(self, request, *args, **kwargs):
        """User sign up."""
        request.data['created_account'] = True
        request.data['username'] = request.data['email']
        request.data['first_password'] = request.data['password']
        program = get_object_or_404(Program, code=kwargs['code'])
        serializer = UserSignUpSerializer(data=request.data, context={
                                          'program': program,
                                          'are_program': True,
                                          'create_instructor': False,
                                          'create_commercial': True,
                                          'create_user_by_commercial': False})
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        account_data = AccountCreatedModelSerializer(data['user']).data
        program = ProgramModifyModelSerializer(data['program']).data
        data = {
            'user': account_data,
            'program': program
        }
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def create_instructor_account(self, request, *args, **kwargs):
        """User sign up."""
        request.data['created_account'] = True
        request.data['username'] = request.data['email']
        request.data['first_password'] = request.data['password']
        program = get_object_or_404(Program, code=kwargs['code'])
        serializer = UserSignUpSerializer(data=request.data, context={
                                          'admin': request.user,
                                          'program': program,
                                          'create_instructor': True,
                                          'are_program': True,
                                          'create_commercial': False,
                                          'create_user_by_commercial': False
                                          })
        serializer.is_valid(raise_exception=True)
        data = serializer.save()

        data = InstructorModelSerializer(data).data
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def create_commercial(self, request, *args, **kwargs):
        """User sign up."""
        request.data['is_commercial'] = True
        request.data['is_staff'] = True
        request.data['username'] = request.data['email']
        # request.data['email'] = '{}'.format(uuid.uuid4().hex[:9].upper())
        request.data['first_password'] = request.data['password']

        commercial_level = request.user.commercial.commercial_level + 1
        if commercial_level > 0 and commercial_level < 2:
            can_create_commercials = True
        else:
            can_create_commercials = False

        serializer = UserSignUpSerializer(data=request.data, context={
            'are_program': False,
            'create_instructor': False,
            'create_commercial': True,
            'create_user_by_commercial': False,
            'user': request.user,
            'commercial_level': commercial_level,
            'can_create_commercials': can_create_commercials
        })
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserCommercialModelSerializer(user).data

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def create_user_by_commercial(self, request, *args, **kwargs):
        """User sign up."""
        request.data['created_by_commercial'] = True
        request.data['username'] = request.data['email']
        request.data['first_password'] = request.data['password']
        serializer = UserSignUpSerializer(data=request.data, context={
            'user': request.user,
            'are_program': False,
            'create_instructor': False,
            'create_commercial': False,
            'create_user_by_commercial': True
        })
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserTeacherCreatedByCommercialModelSerializer(user).data

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def verify(self, request):
        """Account verification."""
        serializer = AccountVerificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {'message': 'Cuenta verificada!'}
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def validate_change_email(self, request):
        """Account verification."""
        serializer = ValidateChangeEmail(
            data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {'message': 'Email cambiado!'}
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['put', 'patch'])
    def profile(self, request, *args, **kwargs):
        """Update profile data."""
        user = request.user
        profile = user.profile

        partial = request.method == 'PATCH'
        serializer = ProfileModelSerializer(
            profile,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = UserWithoutTeacherModelSerializer(user).data
        return Response(data)

    @action(detail=False, methods=['patch'])
    def remove_card(self, request, *args, **kwargs):
        """Remove payment method"""
        user = request.user
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        remove = stripe.PaymentMethod.detach(
            request.data.get('payment_method').get('id'),
        )
        return HttpResponse(status=200)

    @action(detail=False, methods=['post'])
    def stripe_connect(self, request, *args, **kwargs):
        """Process stripe connect auth flow."""
        user = request.user
        profile = user.profile
        code = request.data.get("code")

        if profile.stripe_account_id == None or profile.stripe_account_id == '':
            if 'STRIPE_API_KEY' in os.environ:
                stripe.api_key = os.environ['STRIPE_API_KEY']
            else:
                stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

            response = stripe.OAuth.token(
                grant_type='authorization_code',
                code=code,
            )
            # Access the connected account id in the response
            connected_account_id = response['stripe_user_id']
            if Profile.objects.filter(stripe_account_id=connected_account_id).exists():
                return HttpResponse({'message': 'Esta cuenta de stripe ya esta siendo usada por otro usuario'}, status=400)

            stripe.Account.modify(
                connected_account_id,
                settings={
                    'payouts': {
                        'schedule': {
                            'interval': 'monthly',
                            'monthly_anchor': 1
                        }
                    }
                }
            )
            partial = request.method == 'PATCH'
            profile.stripe_account_id = connected_account_id
            serializer = ProfileModelSerializer(
                profile,
                data=request.data,
                partial=partial
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = UserWithoutTeacherModelSerializer(user).data
            if profile.stripe_account_id != None and profile.stripe_account_id != '':
                stripe_dashboard_url = stripe.Account.create_login_link(
                    data.get('profile').get('stripe_account_id')
                )
                data['profile']['stripe_dashboard_url'] = stripe_dashboard_url['url']

            return Response(data)
        else:
            return HttpResponse(status=400)

    @action(detail=False, methods=['post'])
    def stripe_connect_commercial(self, request, *args, **kwargs):
        """Process stripe connect auth flow."""
        user = request.user
        commercial = user.commercial
        code = request.data.get("code")

        if commercial.commercial_stripe_account_id == None or commercial.commercial_stripe_account_id == '':
            if 'STRIPE_API_KEY' in os.environ:
                stripe.api_key = os.environ['STRIPE_API_KEY']
            else:
                stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

            response = stripe.OAuth.token(
                grant_type='authorization_code',
                code=code,
            )
            # Access the connected account id in the response
            connected_account_id = response['stripe_user_id']
            if Commercial.objects.filter(commercial_stripe_account_id=connected_account_id).exists():
                return HttpResponse({'message': 'Esta cuenta de stripe ya esta siendo usada por otro usuario'}, status=400)

            # stripe.Account.modify(
            #     connected_account_id,
            #     settings={
            #         'payouts': {
            #             'schedule': {
            #                 'interval': 'monthly',
            #                 'monthly_anchor': 1
            #             }
            #         }
            #     }
            # )
            partial = request.method == 'PATCH'
            commercial.commercial_stripe_account_id = connected_account_id
            serializer = CommercialModelSerializer(
                commercial,
                data=request.data,
                partial=partial
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            data = UserWithoutTeacherModelSerializer(user).data

            return Response(data)
        else:
            return HttpResponse(status=400)

    @action(detail=False, methods=['post'])
    def stripe_webhook_subscription_cancelled(self, request, *args, **kwargs):
        """Process stripe webhook notification for subscription cancellation"""
        payload = request.body
        event = None
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        try:
            event = stripe.Event.construct_from(
                json.loads(payload), stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)

        # Handle the event
        if event.type == 'customer.subscription.deleted':
            subscription = event.data.object  # contains a stripe.Subscription
            subscription_data = Subscription.objects.get(
                subscription_id=subscription.id, active=True)
            student = subscription_data.user
            program = subscription_data.program
            program.students.remove(student)
            subscription_data.active = False
            subscription_data.save()
            return HttpResponse(subscription, status=200)

        else:
            # Unexpected event type
            return HttpResponse(status=400)

    @action(detail=False, methods=['post'])
    def stripe_webhook_payment_succeeded(self, request, *args, **kwargs):
        """Process stripe webhook notification for subscription cancellation"""
        payload = request.body
        event = None
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        try:
            event = stripe.Event.construct_from(
                json.loads(payload), stripe.api_key
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)

        # Handle the event
        if event.livemode and event.type == 'invoice.payment_succeeded':
            invoice = event.data.object  # contains a stripe.Invoice
            subscription_data = Subscription.objects.get(
                subscription_id=invoice.subscription, active=True)
            payment = Payment.objects.create(
                invoice_id=invoice.id,
                subscription=subscription_data,
                amount_paid=invoice.amount_paid,
                currency=invoice.currency,
                customer=invoice.customer,
                customer_email=invoice.customer_email,
                customer_name=invoice.customer_name,
                status=invoice.status
            )

            subscription_data.payments.add(payment)
            subscription_data.save()
            customer = subscription_data.user
            user = customer.user_created_by
            if user and user.commercial.commercial_level > 0 and payment:
                commercial = user.commercial
                if commercial.commercial_level == 1:
                    stripe.Transfer.create(
                        amount=int(payment.amount_paid * 50 / 100),
                        currency=payment.currency,
                        destination=commercial.commercial_stripe_account_id
                    )
                if commercial.commercial_level == 2 and user.created_by_commercial and commercial.commercial_created_by:
                    commercial_boss = commercial.commercial_created_by
                    stripe.Transfer.create(
                        amount=int(payment.amount_paid * 40 / 100),
                        currency=payment.currency,
                        destination=commercial.commercial_stripe_account_id
                    )
                    stripe.Transfer.create(
                        amount=int(payment.amount_paid * 10 / 100),
                        currency=payment.currency,
                        destination=commercial_boss.commercial_stripe_account_id
                    )
            return Response(PaymentModelSerializer(payment, many=False).data, status=200)

        else:
            # Unexpected event type
            return Response(status=400)

    @action(detail=False, methods=['get'])
    def get_profile(self, request, *args, **kwargs):

        # if request.user.created_account == True:
        #     return HttpResponse(status=404)
        data = {
            'user': UserModelSerializer(request.user, many=False).data,

        }
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        stripe_account_id = data.get('user').get(
            'profile').get('stripe_account_id')
        stripe_customer_id = data.get('user').get(
            'profile').get('stripe_customer_id')
        if stripe_account_id != None and stripe_account_id != '':
            stripe_dashboard_url = stripe.Account.create_login_link(
                data.get('user').get('profile').get('stripe_account_id')
            )
            data['user']['profile']['stripe_dashboard_url'] = stripe_dashboard_url['url']

        if stripe_customer_id != None and stripe_customer_id != '':
            payment_methods = stripe.PaymentMethod.list(
                customer=stripe_customer_id,
                type="card"
            )
            data['user']['profile']['payment_methods'] = payment_methods.data
        else:
            data['user']['profile']['payment_methods'] = None

        return Response(data)

    @action(detail=True, methods=['get'])
    def get_profile_platform(self, request, *args, **kwargs):

        program = get_object_or_404(
            Program,
            code=kwargs['code']
        )

        if not request.user in program.students.all() and request.user != program.user:
            response = {
                'message': 'No perteneces a esta academia'
            }
            return Response(response, status=404)
        try:
            rating = Rating.objects.get(
                rated_program=program, rating_user=request.user)
            data = {
                'user':  UserModelSerializer(request.user, many=False).data,
                'rating': RatingModelSerializer(rating, many=False).data
            }
        except ObjectDoesNotExist:
            data = {
                'user':  UserModelSerializer(request.user, many=False).data,
                'rating': None
            }

        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        stripe_account_id = data.get('user').get(
            'profile').get('stripe_account_id')
        stripe_customer_id = data.get('user').get(
            'profile').get('stripe_customer_id')
        if stripe_account_id != None and stripe_account_id != '':
            stripe_dashboard_url = stripe.Account.create_login_link(
                data.get('user').get('profile').get('stripe_account_id')
            )
            data['user']['profile']['stripe_dashboard_url'] = stripe_dashboard_url['url']

        if stripe_customer_id != None and stripe_customer_id != '':
            payment_methods = stripe.PaymentMethod.list(
                customer=stripe_customer_id,
                type="card"
            )
            data['user']['profile']['payment_methods'] = payment_methods.data
        else:
            data['user']['profile']['payment_methods'] = None

        return Response(data)

    @action(detail=False, methods=['get'])
    def get_profile_app(self, request, *args, **kwargs):
        if not Student.objects.filter(user=request.user).exists():
            return HttpResponse(status=404)
        data = {
            'user':  UserModelSerializer(request.user, many=False).data,
        }

        return Response(data)

    @action(detail=False, methods=['get'])
    def get_profile_from_dashboard(self, request, *args, **kwargs):
        data = {
            'user': UserCommercialModelSerializer(request.user, many=False).data,
        }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['patch'])
    def add_instructor_accounts(self, request, *args, **kwargs):
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

            if teacher.subscriptions.filter(user=request.user, is_instructor_accounts_subscription=True, active=True).exists():
                accounts_subscription = teacher.subscriptions.filter(
                    user=request.user, is_instructor_accounts_subscription=True, active=True)[0]
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
                teacher_subscription.user = user
                teacher_subscription.product = product['id']
                teacher_subscription.to_be_cancelled = False
                teacher_subscription.payment_issue = False
                teacher_subscription.current_period_end = subscription.current_period_end
                teacher_subscription.is_instructor_accounts_subscription = True
                teacher_subscription.save()
                teacher.save()

            else:

                # Create the subscription

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

                sub = Subscription.objects.create(
                    subscription_id=subscription.id,
                    user=user,
                    program=program,
                    product=product['id'],
                    to_be_cancelled=False,
                    cancelled=False,
                    payment_issue=False,
                    current_period_end=subscription.current_period_end,
                    is_instructor_accounts_subscription=True
                )
                teacher.subscriptions.add(sub)
                teacher.save()

        except Exception as e:
            print(str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer_class = self.get_serializer_class()
        partial = request.method == 'PATCH'
        # Cambiar a Add Instructor Accounts
        serializer = AddInstructorAccountsSerializer(
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
    def cancel_instructor_accounts(self, request, *args, **kwargs):

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

        serializer = CancelInstructorAccountsSerializer(
            program,
            data=request.data,
            context={'program': program},
            partial=partial
        )
        # if teacher.discount:
        #     teacher.discount.delete()
        serializer.is_valid(raise_exception=True)
        if teacher.subscriptions.filter(user=request.user, is_instructor_accounts_subscription=True, active=True).exists():
            try:
                accounts_subscription = teacher.subscriptions.filter(
                    user=request.user, is_instructor_accounts_subscription=True, active=True)[0]
                subscription_deleted = stripe.Subscription.delete(
                    accounts_subscription.subscription_id)
                accounts_subscription.active = False
                accounts_subscription.save()

            except Exception as e:
                return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        program = serializer.save()
        data = ProgramModifyModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_200_OK)
    # @action(detail=True, methods=['get'])
    # def get_ratings(self, request, *args, **kwargs):
    #     user = get_object_or_404(User, code=kwargs['code'])
    #     queryset = Rating.objects.filter(rated_user=user)
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = RatingModelSerializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = RatingModelSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, *args, **kwargs):
    #     """Add extra data to the response."""
    #     response = super(UserViewSet, self).retrieve(request, *args, **kwargs)
    #     # circles = Circle.objects.filter(
    #     #     members=request.user,
    #     #     membership__is_active=True
    #     # )
    #     data = {
    #         'user': response.data,
    #     }
    #     response.data = data
    #     return response

    # @action(detail=False, methods=['put', 'patch'])
    # def teacher(self, request, *args, **kwargs):
    #     """Update profile data."""
    #     user = request.user
    #     teacher = user.teacher
    #     partial = request.method == 'PATCH'
    #     serializer = TeacherModelSerializer(
    #         teacher,
    #         data=request.data,
    #         context={'teaches': request.data.get('teaches')},
    #         partial=partial
    #     )
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     data = UserModelSerializer(user).data
    #     return Response(data)

    # @action(detail=False, methods=['get'])
    # def list_teachers(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     self.pagination_class = PageNumberPagination
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)
