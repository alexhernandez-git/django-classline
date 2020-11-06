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





class CourseItemTrackModelSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField(read_only=True)
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
    
    def get_item(self,obj):
        from api.programs.serializers import CourseItemModelSerializer
        return CourseItemModelSerializer(obj.item).data



class CourseItemTrackCreateModelSerializer(serializers.Serializer):
    def validate(self,data):
        if self.context['name'] == "":
            raise serializers.ValidationError(
                'El nombre no puede estar vacio')
        return data

    def create(self,data): 
        course = self.context['course']
        block = self.context['block']
        name = self.context['name']
        type_choices = self.context['type_choices']
        item_tracks = CourseItemTrack.objects.filter(course=course)
        position = item_tracks.aggregate(Max('position'))
        if position['position__max'] != None:
            new_item_track = CourseItemTrack.objects.create(
                block=block,course=course, item=CourseItem.objects.create(name=name, type_choices=type_choices), position=(position['position__max'] + 1)
            )
        else:
            new_item_track = CourseItemTrack.objects.create(
                block=block,course=course, item=CourseItem.objects.create(name=name, type_choices=type_choices), position=0
            )
        return new_item_track