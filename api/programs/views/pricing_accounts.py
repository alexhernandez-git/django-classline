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
from api.programs.models import PricingAccount

# Serializers
from api.programs.serializers import (
    PricingAccountModelSerializer
)

from api.programs.serializers.subscriptions import(
    SubscriptionSignUpSerializer
)

from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer
)


import stripe


class PricingAccountViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):

    """Circle view set."""
    pagination_class = None

    serializer_class = PricingAccountModelSerializer
    lookup_field = 'id'
    queryset = PricingAccount.objects.all()
