"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string
import uuid


class AccountCreated(CLineModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    program = models.ForeignKey('programs.Program', on_delete=models.CASCADE)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.user, self.program)
