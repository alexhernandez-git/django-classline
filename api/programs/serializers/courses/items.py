"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseItem

# Serializers

from datetime import timedelta
import random
import string




class CourseItemModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = CourseItem
        fields = (
            'id',
            'code',
            'name',
            'type_choices',
            'is_private',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    # def get_items(self, obj):
    #     return CourseItemTrack.objects.filter(block=obj).count()

    # def update(self, instance, validated_data):
           
    #     # Actualizar el tracks
    #     if 'tracks' in self.context and self.context['tracks'] != None:
    #         tracks = self.context['tracks']
    #         for track in tracks:
    #             track_object = get_object_or_404(CourseItemTrack, id=track['id'])
    #             track_object.position = track['position']
    #             track_object.save()
    #     return super(CourseItemModelSerializer, self).update(instance, validated_data)


