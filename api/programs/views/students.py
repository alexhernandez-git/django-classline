"""Circle views."""

# Django REST Framework
from rest_framework import mixins, viewsets, status, filters
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
from api.programs.models import Program, Student
from api.users.models import User

# Serializers
from api.programs.serializers import StudentModelSerializer, StudentListModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class StudentViewSet(mixins.ListModelMixin,
                     mixins.DestroyModelMixin,
                     AddProgramMixin):
    """Circle view set."""

    serializer_class = StudentModelSerializer
    lookup_field = 'pk'
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__username',
                     'user__email', 'user__last_name']

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'list':
            return StudentListModelSerializer
        return StudentModelSerializer

    def get_queryset(self):
        program = self.program

        queryset = Student.objects.filter(program=program)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]

        return [permission() for permission in permissions]
