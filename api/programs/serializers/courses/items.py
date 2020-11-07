"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseItem,LectureContent

# Serializers

from datetime import timedelta
import random
import string




class CourseItemModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    content = serializers.SerializerMethodField(read_only=True)
    class Meta:
        """Meta class."""

        model = CourseItem
        fields = (
            'id',
            'code',
            'name',
            'type_choices',
            'is_private',
            'content'
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_content(self, obj):
        from api.programs.serializers import LectureContentModelSerializer
        content = LectureContent.objects.filter(item=obj.id)
        if len(content) > 0:
            return LectureContentModelSerializer(content[0], many=False).data
        else: 
            return None

    # def update(self, instance, validated_data):
           
    #     # Actualizar el tracks
    #     if 'tracks' in self.context and self.context['tracks'] != None:
    #         tracks = self.context['tracks']
    #         for track in tracks:
    #             track_object = get_object_or_404(CourseItemTrack, id=track['id'])
    #             track_object.position = track['position']
    #             track_object.save()
    #     return super(CourseItemModelSerializer, self).update(instance, validated_data)


