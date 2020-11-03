"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseItemTrack

# Serializers

from datetime import timedelta
import random
import string


class CourseItemTrackModelSerializer(serializers.ModelSerializer):

    class Meta:
        """Meta class."""

        model = CourseItemTrack
        fields = (
            'id',
            'item',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )


