"""Transfers serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Payment


class PaymentModelSerializer(serializers.ModelSerializer):
    """Transfers model serializer."""
    program = serializers.SerializerMethodField(read_only=True)

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
            'status',
            'program'
        )

    def get_program(self, obj):
        return obj.subscription.program.__str__()
