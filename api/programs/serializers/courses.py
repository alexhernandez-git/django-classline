"""Work experience serializer serializer."""
# Django
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
from django.core.files import File


# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Course, Video, CourseTrack

# Serializers
from api.programs.serializers import VideoModelSerializer

from datetime import timedelta


class CourseTrackModelSerializer(serializers.ModelSerializer):
    video = VideoModelSerializer(read_only=True)

    class Meta:
        """Meta class."""

        model = CourseTrack
        fields = (
            'id',
            'video',
            'position',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )


class CourseModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""
    tracks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        """Meta class."""

        model = Course
        fields = (
            'id',
            'name',
            'picture',
            'tracks',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def get_tracks(self, obj):
        course_track = CourseTrack.objects.filter(course=obj)

        return CourseTrackModelSerializer(course_track, many=True).data

    def validate(self, attrs):

        if len(attrs['name']) == 0:
            raise serializers.ValidationError('El nombre no puede estar vacio')

        return super().validate(attrs)

    def update(self, instance, validated_data):
        # Actualizar el precio de la clase
        tracks = self.context['tracks']

        CourseTrack.objects.filter(Course=instance).delete()
        for track in tracks:
            track['video'] = get_object_or_404(Video, id=track['video']['id'])
            CourseTrack.objects.create(
                video=track['video'], position=track['position'], course=instance)
        picture = get_object_or_404(Video, id=tracks[0]['video'].id).picture
        instance.picture = File(picture, picture.name)

        return super(CourseModelSerializer, self).update(instance, validated_data)

    def create(self, validated_data):
        tracks = self.context['tracks']
        validated_data['program'] = self.context['program']

        picture = get_object_or_404(Video, id=tracks[0]['video']['id']).picture

        validated_data['picture'] = File(picture, picture.name)
        course = Course.objects.create(**validated_data)
        for track in tracks:
            track['video'] = get_object_or_404(Video, id=track['video']['id'])
            CourseTrack.objects.create(
                video=track['video'], position=track['position'], course=course)

        return course
