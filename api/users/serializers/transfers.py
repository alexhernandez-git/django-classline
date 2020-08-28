"""Transfers serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Transfer


class TransfersModelSerializer(serializers.ModelSerializer):
    """Transfers model serializer."""

    class Meta:
        """Meta class."""

        model = Transfer
        fields = (
            'transfer_id',
            'destination',
            'destination_payment',
            'ammount',
            'currency',
            'transfer_group'
        )
