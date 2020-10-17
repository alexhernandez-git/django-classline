"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Podcast(CLineModel):

    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_podcasts')
    views = models.PositiveIntegerField(default=0)

    picture = models.ImageField(
        'podcast picture',
        upload_to='programs/podcasts/pictures/',
        max_length=500,
        blank=True, null=True
    )
    audio = models.FileField(
        'podcast audio',
        upload_to='programs/podcasts/videos/',
        max_length=500
    )

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.description)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Podcast.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = Podcast.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        try:
            this = Podcast.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.audio != self.audio:
                this.audio.delete(save=False)
        except:
            pass
        super(Podcast, self).save(**kwargs)
