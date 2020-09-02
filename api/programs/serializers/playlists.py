"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Playlist, Video, PlaylistTrack

# Serializers
from api.programs.serializers import VideoModelSerializer

from datetime import timedelta


class PlaylistTrackModelSerializer(serializers.ModelSerializer):
    video = VideoModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = PlaylistTrack
        fields = (
            'id',
            'video',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )


class PlaylistModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    tracks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Playlist
        fields = (
            'id',
            'name',
            'picture',
            'tracks',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_tracks(self, obj):
        playlist_track = PlaylistTrack.objects.filter(playlist=obj)

        return PlaylistTrackModelSerializer(playlist_track, many=True).data

    def validate(self, attrs):

        if len(attrs['name']) == 0:
            raise serializers.ValidationError('El nombre no puede estar vacio')

        return super().validate(attrs)

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        tracks = self.context['tracks']

        PlaylistTrack.objects.filter(playlist=instance).delete()
        for track in tracks:
            track['video'] = get_object_or_404(Video, id=track['video']['id'])
            PlaylistTrack.objects.create(
                video=track['video'], position=track['position'], playlist=instance)
        picture = get_object_or_404(Video, id=tracks[0]['video'].id).picture
        instance.picture = File(picture, picture.name)

        return super(PlaylistModelSerializer, self).update(instance, validated_data)

    def create(self, validated_data):
        tracks = self.context['tracks']
        validated_data['program'] = self.context['program']

        picture = get_object_or_404(Video, id=tracks[0]['video']['id']).picture

        validated_data['picture'] = File(picture, picture.name)
        playlist = Playlist.objects.create(
            **validated_data, user=self.context['request'].user)
        for track in tracks:
            track['video'] = get_object_or_404(Video, id=track['video']['id'])
            PlaylistTrack.objects.create(
                video=track['video'], position=track['position'], playlist=playlist)

        return playlist
