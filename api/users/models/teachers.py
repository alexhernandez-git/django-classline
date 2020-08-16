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
    discount = models.OneToOneField(
        'users.Coupon', related_name='teacher_coupons', on_delete=models.CASCADE, null=True, blank=True)
    subscriptions = models.ManyToManyField(
        'users.Subscription', related_name='instructor_subscriptions')

    def __str__(self):
        """Return price."""
        return '{}'.format(self.user.first_name)
