"""Subscriptions model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string
import uuid


class PurchasedItem(CLineModel):
    """Subscription model.
    A subscription holds a Stripe subscription meta which belongs to a student for a particular course
    """
    invoice_item_id = models.CharField(max_length=100, blank=True, null=True)

    invoice_id = models.CharField(max_length=100, blank=True, null=True)

    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)

    currency = models.CharField(max_length=3, null=True, blank=True)

    product = models.CharField(max_length=100, null=True, blank=True)

    payment_issue = models.BooleanField(null=False, blank=False, default=False)

    user = models.ForeignKey(
        'users.User', on_delete=models.SET_NULL, null=True, blank=True)

    program = models.ForeignKey(
        'programs.Program', on_delete=models.SET_NULL, null=True, blank=True)

    event = models.ForeignKey(
        'programs.Event', on_delete=models.SET_NULL, null=True, blank=True)

    pack = models.ForeignKey(
        'programs.Pack', on_delete=models.SET_NULL, null=True, blank=True)

    active = models.BooleanField(default=True)

    refunded = models.BooleanField(default=False)

    is_a_purchased_event = models.BooleanField(default=False)

    is_student_purchased_pack = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.invoice_id)
