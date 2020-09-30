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
from api.programs.models import Program, Instructor
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
    search_fields = ['title', 'description']

    def get_queryset(self):
        user = self.request.user
        queryset = Instructor.objects.filter(admin=user, is_active=True)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def get_popular_podcasts(self, request, *args, **kwargs):
        podcast = self.get_queryset()
        podcast = self.serializer_class(podcast, many=True).data
        return Response(podcast, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        serializer = InstructorModelSerializer(
            data=request.data,
            context={
                'program': program,
                'admin': request.user,
                'request': request
            },
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = InstructorModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def perform_destroy(self, instance):

        Instructor.objects.filter(
            user=instance.user, allowed_programs__in_program=self.program).delete()
        instance.delete()
