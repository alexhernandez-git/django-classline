"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import LectureMaterial

# Utils 
from moviepy.editor import VideoFileClip
class LectureMaterialModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = LectureMaterial
        fields = (
            'id',
            'item',
            'file',
            'course',
            'duration',
            'file',
            'name',
            'mega_bytes',

        )
        read_only_fields = (
            'id',
            'item'
        )

    def create(self, validated_data):
        course = self.context['course']
        item = self.context['item']

        if 'file' in validated_data:

            mega_bytes = validated_data['file'].size / 1024 / 1024
            bytes = validated_data['file'].size
            validated_data['mega_bytes'] = mega_bytes
            validated_data['bytes'] = bytes
        
        validated_data['course'] = course
        validated_data['item'] = item

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'file' in validated_data:

            mega_bytes = validated_data['file'].size / 1024 / 1024
            bytes = validated_data['file'].size
            validated_data['mega_bytes'] = mega_bytes
            validated_data['bytes'] = bytes

        return super(LectureMaterialModelSerializer, self).update(instance, validated_data)
