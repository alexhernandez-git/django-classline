"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import LectureContent

# Utils 
from moviepy.editor import VideoFileClip
class LectureContentModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = LectureContent
        fields = (
            'id',
            'type_choices',
            'video',
            'text',
            'duration',
            'mega_bytes',
            'description',
            'item',
            'name'

        )
        read_only_fields = (
            'id',
            'item'
        )

    def create(self, validated_data):
        course = self.context['course']
        item = self.context['item']

        if 'video' in validated_data:
            clip = VideoFileClip(validated_data['video'].temporary_file_path())

            
            mega_bytes = validated_data['video'].size / 1024 / 1024
            bytes = validated_data['video'].size
            validated_data['duration'] = clip.duration
            validated_data['mega_bytes'] = mega_bytes
            validated_data['bytes'] = bytes
        
        validated_data['course'] = course
        validated_data['item'] = item

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'video' in validated_data:
            clip = VideoFileClip(validated_data['video'].temporary_file_path())

            mega_bytes = validated_data['video'].size / 1024 / 1024
            bytes = validated_data['video'].size
            validated_data['mega_bytes'] = mega_bytes
            validated_data['bytes'] = bytes
            validated_data['duration'] = clip.duration

        return super(LectureContentModelSerializer, self).update(instance, validated_data)
