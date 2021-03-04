"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import PackPrice


class PackPriceModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = PackPrice
        fields = (
            'value',
            'type',
            'level',
            'label'
        )
        read_only_fields = (
            'id',
        )
