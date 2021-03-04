"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Podcast


from datetime import timedelta


class PodcastModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Podcast
        fields = (
            'id',
            'title',
            'description',
            'picture',
            'audio',
            'created',
            'duration'
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def validate(self, attrs):
        if len(attrs['title']) == 0:
            raise serializers.ValidationError('El titulo no puede estar vacio')

        return super().validate(attrs)

    def create(self, validated_data):

        validated_data['program'] = self.context['program']

        return super().create(validated_data)
