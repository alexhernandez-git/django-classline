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

    user = models.ForeignKey(
        'users.User', on_delete=models.SET_NULL, null=True, blank=True)

    program = models.ForeignKey(
        'programs.Program', on_delete=models.SET_NULL, null=True, blank=True)

    product = models.CharField(max_length=100, null=True, blank=True)

    payments = models.ManyToManyField(
        'users.Payment', related_name='subscription_payments', blank=True)

    active = models.BooleanField(default=True)

    is_user_to_program_subscription = models.BooleanField(default=False)
    is_student_accounts_subscription = models.BooleanField(default=False)
    is_instructor_accounts_subscription = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.subscription_id)
