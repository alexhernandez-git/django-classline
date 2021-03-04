"""Commercial serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Commercial


class CommercialModelSerializer(serializers.ModelSerializer):
    """Commercial model serializer."""
    commercial_created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        """Meta class."""

        model = Commercial
        fields = (
            'commercial_level',
            'can_create_commercials',
            'commercial_created_by',
            'commercial_stripe_account_id',
        )
