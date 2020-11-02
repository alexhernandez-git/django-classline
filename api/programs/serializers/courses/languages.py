"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import CourseLanguage


class CourseLanguageModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = CourseLanguage
        fields = (
            'value',
            'nativeName',
            'label'
        )
        read_only_fields = (
            'id',
        )
