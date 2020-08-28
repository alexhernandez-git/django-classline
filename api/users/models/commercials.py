"""Profile model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import uuid


class Commercial(CLineModel):
    """Commercial model.
    """
    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    # Commercial fields

    commercial_level = models.PositiveIntegerField(default=0)
    can_create_commercials = models.BooleanField(default=False)
    commercial_created_by = models.ForeignKey(
        'users.User', on_delete=models.SET_NULL, related_name='user_commercial_create', null=True, blank=True)
    commercial_stripe_account_id = models.CharField(
        max_length=100, blank=True, null=True)

    def __str__(self):
        """Return user's str representation."""
        return str(self.user)
