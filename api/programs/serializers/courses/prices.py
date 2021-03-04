"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CoursePrice


class CoursePriceModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = CoursePrice
        fields = (
            'value',
            'type',
            'level',
            'label'
        )
        read_only_fields = (
            'id',
        )
