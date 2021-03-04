"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class VideoTopic(CLineModel):
    video = models.ForeignKey('programs.Video', on_delete=models.CASCADE)
    topic = models.ForeignKey(
        'programs.ProgramTopic', on_delete=models.CASCADE)

    def __str__(self):
        """Return description."""
        return '{} {}'.format(self.video, self.topic)
