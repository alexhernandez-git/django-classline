"""Prices model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class ItemViewed(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)

    item = models.ForeignKey('programs.CourseItem',
                             on_delete=models.CASCADE)


    course = models.ForeignKey('programs.Course',
                             on_delete=models.CASCADE)

    duration = models.FloatField(blank=True, null=True)
    is_viewed = models.BooleanField(default=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.user)

    def save(self, **kwargs):
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not ItemViewed.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(ItemViewed, self).save(**kwargs)
