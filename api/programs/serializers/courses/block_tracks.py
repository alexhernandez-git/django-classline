"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File
from django.db.models import Max

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseBlock, Video, CourseBlockTrack,CourseItem,CourseItemTrack


from datetime import timedelta
import random
import string





class CourseBlockTrackModelSerializer(serializers.ModelSerializer):
    block = serializers.SerializerMethodField(read_only=True)
    class Meta:
        """Meta class."""

        model = CourseBlockTrack
        fields = (
            'id',
            'block',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )
    
    def get_block(self,obj):
        from api.programs.serializers import CourseBlockModelSerializer
        return CourseBlockModelSerializer(obj.block).data


class CourseBlockTrackCreateModelSerializer(serializers.Serializer):
    def create(self,data): 
        course = self.context['course']
        block_tracks = CourseBlockTrack.objects.filter(course=course)
        position = block_tracks.aggregate(Max('position'))
        if position['position__max'] != None:
            new_block_track = CourseBlockTrack.objects.create(
                course=course, block=CourseBlock.objects.create(), position=(position['position__max'] + 1)
            )
        else:
            new_block_track = CourseBlockTrack.objects.create(
                course=course, block=CourseBlock.objects.create(), position=0
            )
        return new_block_track





class CourseBlockTrackPlayingModelSerializer(serializers.ModelSerializer):
    block = serializers.SerializerMethodField(read_only=True)
    class Meta:
        """Meta class."""

        model = CourseBlockTrack
        fields = (
            'id',
            'block',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )
    def __init__(self, *args, **kwargs):
        if 'user' in kwargs:
            self.user = kwargs.pop('user')
        else: 
            self.user = None
        super().__init__(*args, **kwargs)

    def get_block(self,obj):
        from api.programs.serializers import CourseBlockPlayingModelSerializer
   
        return CourseBlockPlayingModelSerializer(obj.block, user=self.user).data

class CourseBlockTrackContentModelSerializer(serializers.ModelSerializer):
    block = serializers.SerializerMethodField(read_only=True)
    class Meta:
        """Meta class."""

        model = CourseBlockTrack
        fields = (
            'id',
            'block',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_block(self,obj):
        from api.programs.serializers import CourseBlockContentModelSerializer
   
        return CourseBlockContentModelSerializer(obj.block).data
