"""Language model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import uuid


class CourseLanguage(CLineModel):
    """Teacher price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    value = models.CharField(max_length=10, blank=True, null=True)

    label = models.CharField(max_length=100, blank=True, null=True)

    nativeName = models.CharField(max_length=100, blank=True, null=True)

    course = models.OneToOneField(
        'programs.Course', on_delete=models.CASCADE)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.label)
