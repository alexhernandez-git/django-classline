"""Language model."""

# Django
from django.db import models

# Utilities

import uuid 

class PricingAccount(models.Model):
    """Teacher price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """    
    price= models.DecimalField(max_digits=10, decimal_places=2, default=0)
    accounts = models.PositiveIntegerField(blank=True, null=True)
    level = models.PositiveIntegerField()
    currency = models.CharField(max_length=3)
    acquired = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['level']

    def __str__(self):
        """Return price."""
        return '{}'.format(self.price)
