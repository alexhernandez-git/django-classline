"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File
from django.db.models import Max

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseBlock, Video, CourseBlockTrack,CourseItem,CourseItemTrack,CourseBlockTrack


from datetime import timedelta
import random
import string





class CourseBlockModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseBlock
        fields = (
            'id',
            'code',
            'name',
            'picture',
            'description',
            'items',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_items(self, obj):
        return CourseItemTrack.objects.filter(block=obj).count()

    def update(self, instance, validated_data):
           
        # Actualizar el tracks
        if 'tracks' in self.context and self.context['tracks'] != None:
            tracks = self.context['tracks']
            for track in tracks:
                try: 
                    track_object = get_object_or_404(CourseItemTrack, id=track['id'])
                    track_object.position = track['position']
                    track_object.save()
                except:
                    pass
        return super(CourseBlockModelSerializer, self).update(instance, validated_data)







class CourseBlockPlayingModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseBlock
        fields = (
            'id',
            'code',
            'name',
            'picture',
            'description',
            'items',
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

    def get_items(self, obj):
        from api.programs.serializers import CourseItemTrackModelSerializer
        items = CourseItemTrack.objects.filter(block=obj.id)
        return CourseItemTrackModelSerializer(items,user=self.user, many=True).data


class CourseBlockContentModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseBlock
        fields = (
            'id',
            'code',
            'name',
            'picture',
            'description',
            'items',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_items(self, obj):
        from api.programs.serializers import CourseItemTrackModelSerializer
        items = CourseItemTrack.objects.filter(block=obj.id)
        return CourseItemTrackModelSerializer(items, many=True).data
