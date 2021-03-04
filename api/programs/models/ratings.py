"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Rating(CLineModel):
    """Teaches rating model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    rating = models.IntegerField(default=1)
    comment = models.TextField(blank=True)

    rating_user = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        null=True,
        help_text='User that emits the rating',
        related_name='rating_user'
    )
    related_instructor = models.ForeignKey(
        'users.User',
        on_delete=models.CASCADE,
        null=True,
        help_text='Instructor that receives the rating.',
        related_name='related_intructor'
    )
    rated_program = models.ForeignKey(
        'programs.Program',
        on_delete=models.CASCADE,
        null=True,
        help_text='Program that receives the rating.',
        related_name='rated_program'
    )

    def __str__(self):
        """Return price."""
        return '{}'.format(self.comment)
