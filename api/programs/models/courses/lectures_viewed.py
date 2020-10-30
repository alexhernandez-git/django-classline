"""Prices model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class LectureViewed(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)

    item = models.ForeignKey('programs.CourseLecture',
                             on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.user)

    def save(self, **kwargs):
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not LectureViewed.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(LectureViewed, self).save(**kwargs)
