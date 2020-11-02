"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseBlock, Video, CourseBlockTrack,CourseItem

# Serializers
from api.programs.serializers import VideoModelSerializer

from datetime import timedelta
import random
import string


class CourseBlockModelSerializer(serializers.ModelSerializer):

    class Meta:
        """Meta class."""

        model = CourseItem
        fields = (
            'id',
            'item',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )


class CourseBlockModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseBlock
        fields = (
            'id',
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
        item_track = CourseItem.objects.filter(block=obj)

        return CourseItemModelSerializer(item_track, many=True).data

    def validate(self, attrs):

        if len(attrs['name']) == 0:
            raise serializers.ValidationError('El nombre no puede estar vacio')

        return super().validate(attrs)

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        tracks = self.context['tracks']

        CourseBlockTrack.objects.filter(block=instance).delete()
        for track in tracks:
            track['item'] = get_object_or_404(CourseItem, id=track['item']['id'])
            CourseBlockTrack.objects.create(
                item=track['item'], position=track['position'], block=instance)
       
        return super(CourseBlockModelSerializer, self).update(instance, validated_data)

    def create(self, validated_data):
        tracks = self.context['tracks']

        block = CourseBlock.objects.create(
            **validated_data, user=self.context['request'].user)
        for track in tracks:
            track['item'] = get_object_or_404(CourseItem, id=track['item']['id'])
            CourseBlockTrack.objects.create(
                item=track['item'], position=track['position'], block=block)

        return block
