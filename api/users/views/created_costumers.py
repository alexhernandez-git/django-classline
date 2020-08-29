"""Users views."""

# Django REST Framework
from api.users.models import User, Profile, Subscription, Commercial
from api.programs.models import Program, Rating, Student
import stripe
import json
import uuid
from api.users.serializers import (
    UserTeacherCreatedByCommercialModelSerializer
)
from django.core.exceptions import ObjectDoesNotExist
from api.programs.serializers import AccountCreatedModelSerializer, ProgramModifyModelSerializer
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


class CreatedCostumerViewSet(mixins.RetrieveModelMixin,
                             mixins.ListModelMixin,
                             mixins.UpdateModelMixin,
                             viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """

    queryset = User.objects.filter(is_active=True, created_by_commercial=True)
    serializer_class = UserTeacherCreatedByCommercialModelSerializer
    lookup_field = 'code'
    filter_backends = (SearchFilter,  DjangoFilterBackend)
    search_fields = ('first_name', 'last_name', 'email')
