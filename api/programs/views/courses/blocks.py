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
from api.programs.models import Program, CourseBlock
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import CourseBlockModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddCourseMixin

from datetime import datetime, timedelta
import pytz


class CourseBlockViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          AddCourseMixin):
    """Circle view set."""

    serializer_class = CourseBlockModelSerializer
    lookup_field = 'code'


    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = CourseBlock.objects.all()
        return queryset

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'
        serializer = serializer_class(
            course,
            data=request.data,
            context={
                'tracks': request.data.get('tracks',None),
                'course': course,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        block = serializer.save()
        data = CourseBlockModelSerializer(block,many=False).data
        return Response(data)
    # def get_permissions(self):
    #     """Assign permissions based on action."""
    #     permissions = []
    #     if self.action in ["retrieve"]:
    #         permissions.append(IsAuthenticated)

    #     return [permission() for permission in permissions]

