"""Work experience views."""

# Django REST Framework
from api.users.models import User
from api.users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpSerializer,
    AccountVerificationSerializer,

)
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser
)
from api.users.permissions import IsAccountOwner, IsTeacherOwner

# Serializers
from api.users.serializers import PromotionCodeModelSerializer


# Models
from api.users.models import PromotionCode

import stripe
import os


class PromotionCodeViewSet(
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """
    queryset = PromotionCode.objects.filter(active=True)
    serializer_class = PromotionCodeModelSerializer
    lookup_field = 'code'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        promotion_code = serializer.data
        if 'STRIPE_API_KEY' in os.environ:
            stripe.api_key = os.environ['STRIPE_API_KEY']
        else:
            stripe.api_key = 'sk_test_51HCsUHIgGIa3w9CpMgSnYNk7ifsaahLoaD1kSpVHBCMKMueUb06dtKAWYGqhFEDb6zimiLmF8XwtLLeBt2hIvvW200YfRtDlPo'

        try:
            stripe_promotion_code = stripe.PromotionCode.retrieve(
                promotion_code['promotion_code_id'],
            )
            if stripe_promotion_code:
                return Response(promotion_code, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
