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
from api.programs.models import Program, CourseBlock, CourseStudent
from api.users.models import User, PurchasedItem

# Serializers
from api.programs.serializers import CourseStudentModelSerializer,CourseStudentListModelSerializer
from api.users.serializers import ProfileModelSerializer

# Utils
from api.utils.permissions import AddCourseMixin

from datetime import datetime, timedelta
import pytz

class CourseStudentViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          AddCourseMixin):
    """Circle view set."""

    serializer_class = CourseStudentModelSerializer
    lookup_field = 'pk'
    filter_backends = [SearchFilter]
    search_fields = ['user__first_name', 'user__username',
                     'user__email', 'user__last_name']

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'list':
            return CourseStudentListModelSerializer
        return CourseStudentModelSerializer

    def get_queryset(self):
        program = self.program
        course = self.course

        queryset = CourseStudent.objects.filter(course=course)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]

        return [permission() for permission in permissions]
