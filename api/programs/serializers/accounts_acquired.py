"""Teacher serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.programs.models import AccountsAcquired


class AccountsAcquiredModelSerializer(serializers.ModelSerializer):
    """Profile model serializer."""

    class Meta:
        """Meta class."""

        model = AccountsAcquired
        fields = (
            'price',
            'accounts',
            'level',
            'currency',
        )
