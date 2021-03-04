"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import PackLanguage


class PackLanguageModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = PackLanguage
        fields = (
            'value',
            'nativeName',
            'label'
        )
        read_only_fields = (
            'id',
        )
