"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Event(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """

    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    videoconference = models.TextField(max_length=500, blank=True)

    start = models.DateTimeField()
    end = models.DateTimeField(blank=True, null=True)
    backgroundColor = models.CharField(max_length=50, blank=True, null=True)
    program = models.ForeignKey('programs.Program', on_delete=models.CASCADE)
    recurrent = models.BooleanField(default=False)
    can_be_booked = models.BooleanField(default=False)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, null=True, blank=True)

    current_students = models.PositiveIntegerField(null=True, blank=True)

    event_students = models.ManyToManyField(
        'users.User',
        through='programs.EventStudent'
    )

    def __str__(self):
        """Return price."""
        return 'Start: {}, end: {}'.format(self.start, self.end)

    def save(self, **kwargs):
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Event.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(Event, self).save(**kwargs)
