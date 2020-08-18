"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Event

from datetime import timedelta


class EventModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = Event
        fields = (
            'id',
            'title',
            'description',
            'start',
            'end',
            'backgroundColor',
            'videoconference',
            'recurrent'
        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def create(self, validated_data):
        program = self.context['program']
        validated_data['program'] = program
        return super().create(validated_data)
