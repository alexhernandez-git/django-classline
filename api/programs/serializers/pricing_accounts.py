"""PricingAccount serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import PricingAccount


class PricingAccountModelSerializer(serializers.ModelSerializer):
    """PricingAccount model serializer."""

    class Meta:
        """Meta class."""

        model = PricingAccount
        fields = (
            'id',
            'price',
            'accounts',
            'level',
            'currency',
        )

        read_only_fields = (
            'id',
        )
