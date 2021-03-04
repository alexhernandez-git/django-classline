"""Work experience model."""

# Django
from django.db import models

# Models
from api.programs.models.allowed_programs import AllowedProgram

# Utilities
from api.utils.models import CLineModel

import random
import string


class Instructor(CLineModel):
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name="instructor_user")
    admin = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name="instructor_creator")
    allowed_programs = models.ManyToManyField(
        'programs.Program',
        through='programs.AllowedProgram'
    )
    is_active = models.BooleanField(null=False, blank=False, default=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.user)
