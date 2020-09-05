"""Program views."""

# Django REST Framework
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
# Permissions
from rest_framework.permissions import IsAuthenticated

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


# Models
from api.programs.models import File

# Serializers
from api.programs.serializers import (
    FileModelSerializer
)

from api.programs.serializers.subscriptions import(
    SubscriptionSignUpSerializer
)

from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer
)

import stripe

# Utils
from api.utils.permissions import AddProgramMixin


class FileViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  AddProgramMixin):

    """Circle view set."""
    pagination_class = None
    serializer_class = FileModelSerializer
    lookup_field = 'pk'
    queryset = File.objects.all()

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = File.objects.filter(program=self.program)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = [IsAuthenticated]

        return [permission() for permission in permissions]

    def list(self, request, *args, **kwargs):
        if 'top_folder' in request.GET and request.GET['top_folder']:
            queryset = self.get_queryset().filter(
                top_folder=request.GET['top_folder'])
        else:
            queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        if 'top_folder' in request.data:
            top_folder = request.data['top_folder']
        else:
            top_folder = None
        serializer = FileModelSerializer(
            data=request.data,
            context={
                'program': program,
                'top_folder': top_folder},
        )
        serializer.is_valid(raise_exception=True)
        file = serializer.save()

        data = FileModelSerializer(file, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        file = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = FileModelSerializer(
            file,
            data=request.data,
            context={
                'program': program,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        file = serializer.save()

        data = FileModelSerializer(file).data
        return Response(data, status=status.HTTP_200_OK)
