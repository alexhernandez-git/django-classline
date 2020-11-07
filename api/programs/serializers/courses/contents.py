"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import LectureContent


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
            'item'

        )
        read_only_fields = (
            'id',
            'item'
        )

    def create(self, validated_data):
        course = self.context['course']
        item = self.context['item']

        validated_data['course'] = course
        validated_data['item'] = item

        return super().create(validated_data)