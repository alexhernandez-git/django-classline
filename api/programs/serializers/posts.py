"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Post


from datetime import timedelta


class PostModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Post
        fields = (
            'id',
            'title',
            'message',
            'created',
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def validate(self, attrs):
        if len(attrs['title']) == 0:
            raise serializers.ValidationError('El titulo no puede estar vacio')
        if len(attrs['message']) == 0:
            raise serializers.ValidationError(
                'El mensaje no puede estar vacio')
        return super().validate(attrs)

    def create(self, validated_data):

        validated_data['program'] = self.context['program']
        validated_data['user'] = self.context['user']

        return super().create(validated_data)
