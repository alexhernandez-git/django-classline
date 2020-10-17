"""Prices model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel
import uuid


class PackPrice(CLineModel):
    """Teacher price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """

    value = models.FloatField(blank=True, null=True)

    type = models.CharField(max_length=5, blank=True, null=True)

    level = models.PositiveIntegerField(blank=True, null=True)

    label = models.CharField(max_length=40, blank=True, null=True)

    pack = models.OneToOneField(
        'programs.Pack', on_delete=models.CASCADE, related_name="pack_price")

    def __str__(self):
        """Return price."""
        return '{}'.format(self.label)
