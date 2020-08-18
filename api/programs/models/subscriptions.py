"""Subscriptions model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string
import uuid


class Subscription(CLineModel):
    """Subscription model.
    A subscription holds a Stripe subscription meta which belongs to a student for a particular course
    """
    subscription_id = models.CharField(max_length=100, blank=True, null=True)
    to_be_cancelled = models.BooleanField(null=False, blank=False)
    cancelled = models.BooleanField(null=False, blank=False, default=False)
    payment_issue = models.BooleanField(null=False, blank=False, default=False)
    current_period_end = models.IntegerField(blank=True, default=0)
    user = models.CharField(max_length=100)
    program = models.CharField(max_length=100)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.subscription_id)
