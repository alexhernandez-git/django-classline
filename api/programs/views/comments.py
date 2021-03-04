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
from api.programs.models import Program, Comment, Post
from api.users.models import User

# Serializers
from api.programs.serializers import CommentModelSerializer

# Utils
from api.utils.permissions import AddPostMixin


class CommentViewSet(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     AddPostMixin):
    """Comment view set."""

    serializer_class = CommentModelSerializer
    lookup_field = 'pk'
    filter_backends = [filters.SearchFilter]
    search_fields = ['message']

    def get_queryset(self):

        post = self.post_instance
        queryset = Comment.objects.filter(post=post)
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        post = self.post_instance

        user_id = self.kwargs['user_id']

        user = get_object_or_404(
            User,
            code=user_id
        )

        program = self.program
        serializer = CommentModelSerializer(
            data=request.data,
            context={
                'program': program,
                'user': user,
                'post': post,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = CommentModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = CommentModelSerializer(
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

        data = CommentModelSerializer(post).data
        return Response(data, status=status.HTTP_200_OK)
