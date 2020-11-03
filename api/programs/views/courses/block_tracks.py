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
from api.programs.models import Program, CourseBlockTrack
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import CourseBlockTrackModelSerializer,CourseBlockTrackCreateModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddCourseMixin

from datetime import datetime, timedelta
import pytz


class CourseBlockTrackViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          AddCourseMixin):
    """Circle view set."""

    serializer_class = CourseBlockTrackModelSerializer
    lookup_field = 'id'
    pagination_class = None

    filter_backends = [SearchFilter]
    search_fields = ['block__title', 'block__description']

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = CourseBlockTrack.objects.filter(
            course=self.course)
        return queryset

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'create':
            return CourseBlockTrackCreateModelSerializer
        return CourseBlockTrackModelSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]


    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""
        serializer_class = self.get_serializer_class()

        serializer = serializer_class(
            data=request.data,
            context={
                'request': request,
                'course': self.course
            },
        )
        serializer.is_valid(raise_exception=True)
        track = serializer.save()

        data = CourseBlockTrackModelSerializer(track, many=False).data
        return Response(data, status=status.HTTP_201_CREATED)

  