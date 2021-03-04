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
from api.programs.models import Program, Video
from api.users.models import User

# Serializers
from api.programs.serializers import VideoModelSerializer, AddViewSerializer

# Utils
from api.utils.permissions import AddProgramMixin


class VideoViewSet(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   AddProgramMixin):
    """Circle view set."""

    serializer_class = VideoModelSerializer
    lookup_field = 'pk'
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description']

    def get_queryset(self):
        program = self.program

        queryset = Video.objects.filter(program=program)

        if self.action == 'get_popular_videos':
            queryset = Video.objects.filter(
                program=program).order_by('views')[:12]
        return queryset

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ["retrieve"]:
            permissions.append(IsAuthenticated)

        return [permission() for permission in permissions]

    @action(detail=False, methods=['get'])
    def get_popular_videos(self, request, *args, **kwargs):
        videos = self.get_queryset()
        videos = self.serializer_class(videos, many=True).data
        return Response(videos, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""

        program = self.program
        serializer = VideoModelSerializer(
            data=request.data,
            context={
                'program': program,
                'request': request},
        )
        serializer.is_valid(raise_exception=True)
        program = serializer.save()

        data = VideoModelSerializer(program, many=False).data

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['patch'])
    def add_view(self, request, *args, **kwargs):
        program = self.program
        video = get_object_or_404(Video, pk=kwargs['pk'])
        partial = request.method == 'PATCH'

        serializer = AddViewSerializer(
            video,
            data=request.data,
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        video = self.get_object()
        program = self.program
        partial = request.method == 'PATCH'

        serializer = VideoModelSerializer(
            video,
            data=request.data,
            context={
                'program': program,
                'request': request
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        video = serializer.save()

        data = VideoModelSerializer(video).data
        return Response(data, status=status.HTTP_200_OK)
