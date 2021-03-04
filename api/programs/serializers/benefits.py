"""Benefit serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import Benefit


class BenefitModelSerializer(serializers.ModelSerializer):
    """Benefit model serializer."""

    class Meta:
        """Meta class."""

        model = Benefit
        fields = (
            'id',
            'name',
        )

        read_only_fields = (
            'id',
        )
