"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class CourseItem(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)

    name = models.CharField(max_length=100)

    LECTURE = 'LE'
    TEST = 'TE'
    TYPE_CHOICES = [
        (LECTURE, 'Lecture'),
        (TEST, 'Test'),
    ]
    type_choices = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
    )
    is_private = models.BooleanField(default=False)
    is_free  = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not CourseItem.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseItem, self).save(**kwargs)
