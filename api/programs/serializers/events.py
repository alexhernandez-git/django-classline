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
            'color',
            'videoconference',
            'recurrent',
            'price',
            'currency',
            'bookable'

        )
        # extra_kwargs = {'end': {'required': False}}
        read_only_fields = (
            'id',
        )

    def create(self, validated_data):
        program = self.context['program']
        validated_data['program'] = program
        return super().create(validated_data)

    def update(self, instance, validated_data):
        event_parent = instance.event_buyed_parent

        if event_parent:
            events = Event.objects.filter(event_buyed_parent=event_parent)
            if events.exists():
                for e in events:
                    e.start = instance.start
                    e.end = instance.end
                    e.save()

        return super(EventModelSerializer, self).update(instance, validated_data)
