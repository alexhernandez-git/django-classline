"""Circle views."""
# Django
from django.db.models import Avg

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
from api.programs.models import Program, AccountCreated, Rating, Student
from api.users.models import User

# Serializers
from api.programs.serializers import AccountCreatedModelSerializer, ProgramModifyModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class AccountCreatedViewSet(mixins.ListModelMixin,
                            mixins.DestroyModelMixin,
                            AddProgramMixin):
    """Circle view set."""

    serializer_class = AccountCreatedModelSerializer
    lookup_field = 'pk'
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__username',
                     'user__email', 'user__last_name']

    def get_queryset(self):
        program = self.program

        queryset = AccountCreated.objects.filter(
            program=program, user__is_active=True)

        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]

        return [permission() for permission in permissions]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        program = self.program
        program.accounts_to_create_left += 1
        if program.accounts_to_create_left > program.current_accounts:
            program.accounts_to_create_left = program.current_accounts
        self.perform_destroy(instance)
        if Rating.objects.filter(
            rated_program=program
        ).exists():
            program_avg = round(
                Rating.objects.filter(
                    # rating_user=self.context['request'].user,
                    rated_program=program
                ).aggregate(Avg('rating'))['rating__avg'],
                1
            )
            program.rating = program_avg
        if Rating.objects.filter(
            related_instructor=program.user
        ).exists():
            instructor_avg = round(
                Rating.objects.filter(
                    related_instructor=program.user
                ).aggregate(Avg('rating'))['rating__avg'],
                1
            )
            program.user.teacher.rating = instructor_avg
        program.save()
        data = ProgramModifyModelSerializer(program).data

        return Response(data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):

        Student.objects.filter(
            user=instance.user, program=self.program).delete()
        instance.delete()
