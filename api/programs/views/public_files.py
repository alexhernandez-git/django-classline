"""Program views."""

# Django REST Framework
from rest_framework import mixins, viewsets, status, filters
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
    FileModelSerializer,
    ShareUsersFilesSerializer
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


class PublicFileViewSet(mixins.CreateModelMixin,
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
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = File.objects.filter(program=self.program)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []

        return [permission() for permission in permissions]

    def list(self, request, *args, **kwargs):
        if 'top_folder' in request.GET and request.GET['top_folder']:
            queryset = self.get_queryset().filter(
                top_folder=request.GET['top_folder'], is_private=False)
        else:
            queryset = self.get_queryset().filter(
                top_folder=None, is_private=False)
        queryset = self.filter_queryset(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
