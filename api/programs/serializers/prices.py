"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import ProgramPrice


class ProgramPriceModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = ProgramPrice
        fields = (
            'value',
            'type',
            'level',
            'label'
        )
        read_only_fields = (
            'id',
        )
