"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class EventStudent(CLineModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    event = models.ForeignKey('programs.Event', on_delete=models.CASCADE)
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.user, self.event)
