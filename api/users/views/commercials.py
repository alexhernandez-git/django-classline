"""Users views."""

# Django REST Framework
from api.users.models import User, Profile, Subscription, Commercial
from api.programs.models import Program, Rating, Student
import stripe
import json
import uuid
from api.users.serializers import (
    UserCommercialModelSerializer
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


class CommercialViewSet(mixins.RetrieveModelMixin,
                        mixins.ListModelMixin,
                        mixins.UpdateModelMixin,
                        viewsets.GenericViewSet):
    """User view set.

    Handle sign up, login and account verification.
    """

    queryset = User.objects.filter(is_active=True, is_commercial=True)
    serializer_class = UserCommercialModelSerializer
    lookup_field = 'code'
    filter_backends = (SearchFilter,  DjangoFilterBackend)
    search_fields = ('first_name', 'last_name', 'email')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        user = User.objects.get(code=request.GET['user_code'])
        queryset = queryset.filter(commercial__commercial_created_by=user)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
