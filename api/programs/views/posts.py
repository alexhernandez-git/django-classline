"""Circle views."""

from django.shortcuts import get_object_or_404

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
from api.programs.models import Program, Post
from api.users.models import User

# Serializers
from api.programs.serializers import PostModelSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class PostViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  AddProgramMixin):
    """Post view set."""

    serializer_class = PostModelSerializer
    lookup_field = 'code'
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'message']

    def get_queryset(self):
        program = self.program

        queryset = Post.objects.filter(program=program)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        serializer = PostModelSerializer(
            data=request.data,
            context={
                'program': program,
                'user': request.user,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = PostModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = PostModelSerializer(
            post,
            data=request.data,
            context={
                'program': program,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        post = serializer.save()

        data = PostModelSerializer(post).data
        return Response(data, status=status.HTTP_200_OK)
