"""Transfers serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Payment


class PaymentModelSerializer(serializers.ModelSerializer):
    """Transfers model serializer."""

    class Meta:
        """Meta class."""

        model = Payment
        fields = (
            'invoice_id',
            'subscription_id',
            'amount_paid',
            'currency',
            'customer',
            'customer_email',
            'customer_name',
            'status'
        )
