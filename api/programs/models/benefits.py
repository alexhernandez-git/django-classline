"""Prices model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Benefit(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)

    name = models.CharField(max_length=40, blank=True, null=True)
    program = models.ForeignKey('programs.Program', on_delete=models.CASCADE)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Benefit.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(Benefit, self).save(**kwargs)