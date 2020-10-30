"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Video


from datetime import timedelta


class VideoModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Video
        fields = (
            'id',
            'title',
            'description',
            'duration',
            'picture',
            'video',
            'created',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def validate(self, attrs):
        if 'title' in attrs and len(attrs['title']) == 0:
            raise serializers.ValidationError('El titulo no puede estar vacio')

        return super().validate(attrs)

    def create(self, validated_data):

        mega_bytes = validated_data['video'].size / 1024 / 1024
        bytes = validated_data['video'].size
        validated_data['mega_bytes'] = mega_bytes
        validated_data['bytes'] = bytes
        validated_data['program'] = self.context['program']

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'video' in validated_data:
            mega_bytes = validated_data['video'].size / 1024 / 1024
            bytes = validated_data['video'].size
            validated_data['mega_bytes'] = mega_bytes
            validated_data['bytes'] = bytes
        return super(VideoModelSerializer, self).update(instance, validated_data)


class AddViewSerializer(serializers.Serializer):

    def update(self, instance, validated_data):
        instance.views += 1
        instance.save()

        return instance
