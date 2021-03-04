"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import uuid


class AccountsAcquired(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    accounts = models.PositiveIntegerField(blank=True, null=True)
    level = models.PositiveIntegerField()
    currency = models.CharField(max_length=3)

    program = models.ForeignKey('programs.Program', on_delete=models.CASCADE)

    def __str__(self):
        """Return price."""
        return '{}'.format(self.price)
