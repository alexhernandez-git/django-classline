"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import PlaylistTopic, Video, ProgramTopic, Playlist


from datetime import timedelta


class PlaylistTopicModelSerializer(serializers.ModelSerializer):
    podcast = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = PlaylistTopic
        fields = (
            'id',
            'podcast',
            'topic',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_podcast(self, obj):
        from api.programs.serializers import PlaylistModelSerializer
        podcast = obj.podcast
        return PlaylistModelSerializer(podcast, many=False).data
