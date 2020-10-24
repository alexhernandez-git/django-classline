"""Topic views."""

# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
import os
import stripe

from api.users.serializers import (
    ProfileModelSerializer,
    UserWithoutTeacherModelSerializer,
    CouponModelSerializer,
    AddInstructorAccountsSerializer,
    CancelInstructorAccountsSerializer,
    UserModelSerializer
)

from api.programs.serializers import (
    ProgramTopicModelSerializer,
    ProgramTopicCreateSerializer,
    ProgramTopicModifyModelSerializer,
    AddVideoTopicSerializer,
    RemoveVideoTopicSerializer,
    AddPodcastTopicSerializer,
    RemovePodcastTopicSerializer,
    AddPlaylistTopicSerializer,
    RemovePlaylistTopicSerializer,
    VideoTopicModelSerializer,
    PodcastTopicModelSerializer,
    PlaylistTopicModelSerializer
)
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
from api.programs.models import ProgramTopic, Video, Podcast, Playlist
from api.users.models import User, Subscription, Teacher, Profile, Coupon, PurchasedItem

# Utils
from api.utils.permissions import AddProgramMixin


class ProgramTopicViewSet(mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.DestroyModelMixin,
                          AddProgramMixin):
    """Topic view set."""

    serializer_class = ProgramTopicModelSerializer
    lookup_field = 'code'
    search_fields = ('title', 'description')
    filter_backends = [SearchFilter]

    def get_queryset(self):
        """Restrict list to public-only."""
        queryset = Topic.objects.filter(program=self.program)
        if self.action in ['list']:
            queryset = ProgramTopic.objects.filter(
                program=self.program)

        return queryset

    def get_serializer_class(self):
        """Return serializer based on action."""
        if self.action == 'create':
            return TopicCreateSerializer
        if self.action in ['update', 'partial_update', 'get_accounts', 'cancel_accounts']:
            return TopicModifyModelSerializer
        elif self.action == 'publish':
            return PublishTopicSerializer
        elif self.action == 'cancel_publish':
            return CancelPublishTopicSerializer
        elif self.action == 'add_video':
            return AddVideoTopicSerializer
        elif self.action == 'remove_video':
            return RemoveVideoTopicSerializer
        elif self.action == 'add_playlist':
            return AddPlaylistTopicSerializer
        elif self.action == 'remove_playlist':
            return RemovePlaylistTopicSerializer
        elif self.action == 'add_podcast':
            return AddPodcastTopicSerializer
        elif self.action == 'remove_podcast':
            return RemovePodcastTopicSerializer
        return TopicModelSerializer

    def get_permissions(self):
        """Assign permissions based on action."""
        permissions = []
        if self.action in ['update', 'partial_update', 'delete', 'list_my_topics']:
            permissions.append(IsAuthenticated)
        return [permission() for permission in permissions]

    @action(detail=True, methods=['put', 'patch'])
    def add_video(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        video = get_object_or_404(Video, pk=request.data['video'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'video': video},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        video_topic = serializer.save()

        data = VideoTopicModelSerializer(video_topic).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def remove_video(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        video = get_object_or_404(Video, pk=request.data['video'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'video': video},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['put', 'patch'])
    def add_palylist(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        playlist = get_object_or_404(Playlist, pk=request.data['playlist'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'playlist': playlist},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        playlist_topic = serializer.save()

        data = VideoTopicModelSerializer(playlist_topic).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def remove_video(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        video = get_object_or_404(Video, pk=request.data['video'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'video': video},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['put', 'patch'])
    def add_podcast(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        podcast = get_object_or_404(Podcast, pk=request.data['podcast'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'podcast': podcast},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        podcast_topic = serializer.save()

        data = PodcastTopicModelSerializer(podcast_topic).data
        return Response(data)

    @action(detail=True, methods=['put', 'patch'])
    def remove_podcast(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()
        podcast = get_object_or_404(Podcast, pk=request.data['podcast'])

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={'podcast': podcast},
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        topic = self.get_object()
        serializer_class = self.get_serializer_class()

        partial = request.method == 'PATCH'

        serializer = serializer_class(
            topic,
            data=request.data,
            context={
                'price': request.data.get('topic_price'),
                'language': request.data.get('topic_language'),
            },
            partial=partial
        )
        serializer.is_valid(raise_exception=True)

        topic = serializer.save()

        data = TopicModelSerializer(topic).data
        return Response(data)

    def create(self, request, *args, **kwargs):
        """Call by owners to finish a ride."""
        serializer_class = self.get_serializer_class()

        serializer = serializer_class(
            data=request.data,
            context={
                'request': request,
                'program': self.program
            },
        )
        serializer.is_valid(raise_exception=True)
        topic = serializer.save()

        data = TopicModelSerializer(topic, many=False).data
        return Response(data, status=status.HTTP_201_CREATED)
