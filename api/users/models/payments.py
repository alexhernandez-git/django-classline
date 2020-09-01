"""Subscriptions model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string
import uuid


class Payment(CLineModel):
    """Subscription model.
    A subscription holds a Stripe subscription meta which belongs to a student for a particular course
    """
    invoice_id = models.CharField(max_length=100, blank=True, null=True)
    subscription = models.ForeignKey(
        'users.Subscription', on_delete=models.SET_NULL, null=True, blank=True)
    amount_paid = models.PositiveIntegerField(default=0)
    currency = models.CharField(max_length=10, blank=True, null=True)
    customer = models.CharField(max_length=100, blank=True, null=True)
    customer_email = models.CharField(max_length=100, blank=True, null=True)
    customer_name = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.subscription_id)
