"""Teacher serializer."""

# Django
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import (
    User,
    Subscription
)
from api.programs.models import (
    ProgramTopic,
    VideoTopic,
    PodcastTopic,
    PlaylistTopic

)

# Serializes
from .videos import VideoModelSerializer

# Utils
from datetime import timedelta


class ProgramTopicModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    videos = serializers.SerializerMethodField(read_only=True)
    playlists = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = ProgramTopic
        fields = (
            'id',
            'code',
            'name',
            'picture',
            'videos',
            'playlists',
            'podcasts',
        )

        read_only_fields = (
            'id',
        )

    def get_videos(self, obj):
        videos = VideoTopic.objects.filter(topic=obj.id).count()
        return videos

    def get_podcasts(self, obj):
        podcasts = PodcastTopic.objects.filter(topic=obj.id).count()
        return podcasts

    def get_playlists(self, obj):
        playlists = PlaylistTopic.objects.filter(topic=obj.id).count()
        return playlists


class ProgramTopicCreateSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    class Meta:
        """Meta class."""

        model = ProgramTopic
        fields = (
            'id',
        )

        read_only_fields = (
            'id',
        )

    def create(self, validated_data):

        user = self.context['request'].user
        validated_data['user'] = user
        validated_data['teacher'] = user.teacher

        program = self.context['program']
        validated_data['program'] = program

        return super().create(validated_data)


class ProgramTopicModifyModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    videos = serializers.SerializerMethodField(read_only=True)
    playlists = serializers.SerializerMethodField(read_only=True)
    podcasts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = ProgramTopic
        fields = (
            'id',
            'code',
            'name',

            'picture',
            'videos',
            'playlists',
            'podcasts',
        )

        read_only_fields = (
            'id',
        )

    def get_videos(self, obj):
        videos = VideoTopic.objects.filter(topic=obj.id).count()
        return videos

    def get_playlists(self, obj):
        playlists = PlaylistTopic.objects.filter(topic=obj.id).count()
        return playlists

    def get_podcasts(self, obj):
        podcasts = PodcastTopic.objects.filter(topic=obj.id).count()
        return podcasts

        return super(ProgramTopicModifyModelSerializer, self).update(instance, validated_data)


class AddVideoTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        video = self.context['video']
        if VideoTopic.objects.filter(video=video, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya contiene ese video')
        instance.videos.add(video)
        instance.save()
        return get_object_or_404(VideoTopic, video=video, topic=instance)


class RemoveVideoTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        video = self.context['video']
        if not VideoTopic.objects.filter(video=video, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya no contiene ese video')
        instance.videos.remove(video)
        instance.save()
        return instance


class AddPodcastTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        podcast = self.context['podcast']
        if PodcastTopic.objects.filter(podcast=podcast, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya contiene ese podcast')
        instance.podcasts.add(podcast)
        instance.save()
        return get_object_or_404(PodcastTopic, podcast=podcast, topic=instance)


class RemovePodcastTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        podcast = self.context['podcast']
        if not PodcastTopic.objects.filter(podcast=podcast, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya no contiene ese podcast')
        instance.podcasts.remove(podcast)
        instance.save()
        return instance


class AddPlaylistTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        playlist = self.context['playlist']

        if PlaylistTopic.objects.filter(playlist=playlist, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya contiene ese playlist')
        instance.playlists.add(playlist)
        instance.save()
        return get_object_or_404(PlaylistTopic, playlist=playlist, topic=instance)


class RemovePlaylistTopicSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        playlist = self.context['playlist']
        if not PlaylistTopic.objects.filter(playlist=playlist, topic=instance).exists():
            raise serializers.ValidationError(
                'Tu tema ya no contiene ese playlist')
        instance.playlists.remove(playlist)
        instance.save()
        return instance
