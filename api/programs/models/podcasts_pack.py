"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class PodcastPack(CLineModel):
    podcast = models.ForeignKey('programs.Podcast', on_delete=models.CASCADE)
    pack = models.ForeignKey('programs.Pack', on_delete=models.CASCADE)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.podcast, self.pack)
