"""Work experience serializer serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Event

from datetime import timedelta, datetime, timezone


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
            'online_class',
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

    def validate_videoconference(self, data):

        if self.context['request'].data['online_class'] and data == "":
            raise serializers.ValidationError(
                'Este campo no puede estar vacio'
            )
        return data

    def validate_price(self, data):

        if self.context['request'].data['bookable'] and data <= 0:
            raise serializers.ValidationError(
                'El precio del evento tiene que ser mayor a 0'
            )
        return data

    def create(self, validated_data):
        program = self.context['program']
        validated_data['program'] = program
        return super().create(validated_data)

    def update(self, instance, validated_data):

        events = Event.objects.filter(event_buyed_parent=instance)
        are_events_booked = False
        if events.exists():
            now = datetime.now(tz=timezone.utc)
            for e in events:
                if e.start > now:
                    are_events_booked = True
                    validated_data.pop('start')
                    validated_data.pop('recurrent')
                    if 'end' in validated_data:
                        validated_data.pop('end')
                    super(EventModelSerializer, self).update(e, validated_data)
        event = super(EventModelSerializer, self).update(
            instance, validated_data)
        data = {'event': event, 'are_events_booked': are_events_booked}

        return data

        # if e.start < now:
        #     raise serializers.ValidationError(
        #         'Este evento ya ha sido reservado y no puedes cambiar la hora, para editar espera a no tener alumnos o borra el evento y se devolverá el dinero'
        #     )
        # for e in events:
        #     now = datetime.now(tz=timezone.utc)

        #     if e.start < now:
        #         super(EventModelSerializer, self).update(
        #             e, validated_data)

        # event_parent = instance.event_buyed_parent

        # if event_parent:
        #     events = Event.objects.filter(event_buyed_parent=event_parent)
        #     if events.exists():
        #         for e in events:
        #             e.start = instance.start
        #             e.end = instance.end
        #             e.save()

        # events = Event.objects.filter(event_buyed_parent=instance)
        # if events.exists():
        #     for e in events:

        #         if e.event_buyed_parent.start != validated_data['start'] or ('end' in validated_data and e.event_buyed_parent.end != validated_data['end']):
        #             raise serializers.ValidationError(
        #                 'Este evento ya ha sido reservado y no puedes cambiar la hora'
        #             )
        #         else:
        #             now = datetime.now(tz=timezone.utc)

        #             if e.start > now:
        #                 super(EventModelSerializer, self).update(
        #                     e, validated_data)
