"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import PodcastPack, Video, Pack, Podcast


from datetime import timedelta


class PodcastPackModelSerializer(serializers.ModelSerializer):
    podcast = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = PodcastPack
        fields = (
            'id',
            'podcast',
            'pack',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_podcast(self, obj):
        from api.programs.serializers import PodcastModelSerializer
        podcast = obj.podcast
        return PodcastModelSerializer(podcast, many=False).data
