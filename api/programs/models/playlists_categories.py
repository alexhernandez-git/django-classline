"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class PlaylistCategory(CLineModel):
    playlist = models.ForeignKey('programs.Playlist', on_delete=models.CASCADE)
    category = models.ForeignKey(
        'programs.CategoryPlaylists', on_delete=models.CASCADE)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.playlist, self.category)
