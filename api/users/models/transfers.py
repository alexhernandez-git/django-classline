"""Subscriptions model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string
import uuid


class Transfer(CLineModel):
    """Subscription model.
    A subscription holds a Stripe subscription meta which belongs to a student for a particular course
    """
    transfer_id = models.CharField(max_length=100, blank=True, null=True)
    destination = models.CharField(max_length=100, blank=True, null=True)
    destination_payment = models.CharField(
        max_length=100, blank=True, null=True)
    ammount = models.PositiveIntegerField(default=0)
    currency = models.CharField(max_length=10, blank=True, null=True)
    transfer_group = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.transfer_id)
