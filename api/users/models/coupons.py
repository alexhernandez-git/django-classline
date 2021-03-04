"""Profile model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel


class Coupon(CLineModel):
    coupon_id = models.CharField(max_length=50)
    percent_off = models.PositiveIntegerField(blank=True, null=True)
    duration = models.CharField(max_length=50)
    valid = models.BooleanField(default=True)

    def __str__(self):
        """Return user's str representation."""
        return str(self.coupon_id)
