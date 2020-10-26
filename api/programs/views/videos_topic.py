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
from api.programs.models import Program, VideoTopic
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import VideoTopicModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddTopicMixin

from datetime import datetime, timedelta
import pytz


class VideoTopicViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        AddTopicMixin):
    """Circle view set."""

    serializer_class = VideoTopicModelSerializer
    lookup_field = 'pk'
    filter_backends = [SearchFilter]
    search_fields = ['video__title', 'video__description']

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = VideoTopic.objects.filter(
            topic=self.topic)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]
