"""Profile serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import Coupon


class CouponModelSerializer(serializers.ModelSerializer):
    """Coupon model serializer."""
    class Meta:
        """Meta class."""

        model = Coupon
        fields = (
            'id',
            'coupon_id',
            'percent_off',
            'duration',
        )

        read_only_fields = (
            'id',
            'coupon_id',
            'percent_off',
            'duration',
        )
