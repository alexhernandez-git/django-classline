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
from api.programs.models import Folder

# Serializers
from api.programs.serializers import (
    FolderModelSerializer
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


class FolderViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    AddProgramMixin):

    """Circle view set."""
    pagination_class = None
    serializer_class = FolderModelSerializer
    lookup_field = 'pk'
    queryset = Folder.objects.all()

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = Folder.objects.filter(program=self.program)
        return queryset

    def list(self, request, *args, **kwargs):
        if 'folder_top' in request.GET:
            queryset = self.get_queryset().filter(
                folder_top=request.GET['folder_top'])
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
        serializer = FolderModelSerializer(
            data=request.data,
            context={
                'program': program,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        file = serializer.save()

        data = FolderModelSerializer(file, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        file = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = FolderModelSerializer(
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

        data = FolderModelSerializer(file).data
        return Response(data, status=status.HTTP_200_OK)
