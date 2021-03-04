"""Profile serializer."""

# Django REST Framework
from rest_framework import serializers

# Models
from api.users.models import PromotionCode


class PromotionCodeModelSerializer(serializers.ModelSerializer):
    """Coupon model serializer."""
    class Meta:
        """Meta class."""

        model = PromotionCode
        fields = (
            'id',
            'promotion_code_id',
            'active',
            'coupon_id',
            'code',
            'percent_off',
        )

        read_only_fields = (
            'id',

        )
