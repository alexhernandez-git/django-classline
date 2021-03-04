"""Profile model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel


class PromotionCode(CLineModel):
    promotion_code_id = models.CharField(max_length=50)
    active = models.BooleanField(default=True)
    coupon_id = models.CharField(max_length=50)
    code = models.CharField(max_length=50)
    percent_off = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        """Return user's str representation."""
        return str(self.coupon_id)
