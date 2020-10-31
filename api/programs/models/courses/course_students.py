"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class CourseStudent(CLineModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    course = models.ForeignKey('programs.Course', on_delete=models.CASCADE)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.user, self.course)
