"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string

import uuid


class Rating(CLineModel):
    """Teaches rating model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    rating = models.IntegerField(default=1)
    comment = models.TextField(blank=True)

    rating_user = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        help_text='User that emits the rating',
        related_name='rating_user'
    )
    rated_user = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        help_text='User that receives the rating.',
        related_name='rated_user'
    )
    related_teacher = models.ForeignKey(
        'users.Teacher',
        on_delete=models.SET_NULL,
        null=True,
        help_text='Teacher that receives the rating.',
        related_name='rated_teacher'
    )

    def __str__(self):
        """Return price."""
        return '{}'.format(self.comment)
