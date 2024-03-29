"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import VideoPack, Video, Pack


from datetime import timedelta


class VideoPackModelSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = VideoPack
        fields = (
            'id',
            'video',
            'pack',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_video(self, obj):
        from api.programs.serializers import VideoModelSerializer
        video = obj.video
        return VideoModelSerializer(video, many=False).data
