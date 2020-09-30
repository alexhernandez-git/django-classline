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
from api.programs.models import Program, Instructor, AllowedProgram
from api.users.models import User

# Serializers
from api.programs.serializers import InstructorModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class InstructorViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        AddProgramMixin):
    """Circle view set."""

    serializer_class = InstructorModelSerializer
    lookup_field = 'pk'
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__username',
                     'user__email', 'user__last_name', 'admin__first_name', 'admin__username',
                     'admin__email', 'admin__last_name']

    def get_queryset(self):
        user = self.request.user
        queryset = Instructor.objects.filter(
            admin=user, is_active=True, allowed_programs=self.program)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        teacher = self.request.user.teacher
        teacher.accounts_to_create_left += 1
        if teacher.accounts_to_create_left > teacher.current_accounts:
            teacher.accounts_to_create_left = teacher.current_accounts
        teacher.save()
        instance.delete()
