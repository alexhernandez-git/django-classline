"""Teaches Model"""


# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel


import random
import string


class Teacher(CLineModel):
    """Teacher model."""
    user = models.OneToOneField('users.User', on_delete=models.CASCADE)
    rating = models.FloatField(default=0)
    application_fee_percent = models.PositiveIntegerField(default=25)
    discount = models.OneToOneField(
        'users.Coupon', related_name='teacher_coupons', on_delete=models.SET_NULL, null=True, blank=True)
    subscriptions = models.ManyToManyField(
        'users.Subscription', related_name='create_accounts_subscription', blank=True)

    instructors = models.ManyToManyField(
        'programs.Instructor', related_name='instructors_programs', blank=True)

    current_accounts = models.PositiveIntegerField(default=0)
    accounts_to_create_left = models.PositiveIntegerField(default=0)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.user.first_name)
