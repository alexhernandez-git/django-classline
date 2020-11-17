"""Circle views."""
import os
import stripe
# Django REST Framework
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Permissions
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


# Models
from api.programs.models import Program, ItemViewed
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import ItemViewedModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddItemMixin

from datetime import datetime, timedelta
import pytz


class ItemViewedViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          AddItemMixin):
    """Circle view set."""

    serializer_class = ItemViewedModelSerializer
    lookup_field = 'id'
    pagination_class = None

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = ItemViewed.objects.filter(course=self.course, user=self.request.user)
        return queryset


    def create(self, request, *args, **kwargs):
        serializer_class = self.get_serializer_class()

        serializer = serializer_class(
            data=request.data,
            context={
                'request': request,
                'item': self.item,
                'course': self.course,
                'user': request.user
            },
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        question = self.get_object()
        partial = request.method == 'PATCH'

        serializer = ItemViewedModelSerializer(
            question,
            data=request.data,
            context={
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        question = serializer.save()

        data = ItemViewedModelSerializer(question).data
        return Response(data, status=status.HTTP_200_OK)
