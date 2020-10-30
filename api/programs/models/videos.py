"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Video(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, blank=True, null=True)
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_videos')
    views = models.PositiveIntegerField(default=0)
    duration = models.FloatField(blank=True, null=True)
    mega_bytes = models.FloatField(blank=True, null=True)
    bytes = models.PositiveIntegerField(blank=True, null=True)

    picture = models.ImageField(
        'profile picture',
        upload_to='programs/videos/pictures/',
        blank=True, null=True,
        max_length=500
    )
    video = models.FileField(
        'profile video',
        upload_to='programs/videos/videos/',
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
                if not Video.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = Video.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        try:
            this = Video.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.video != self.video:
                this.video.delete(save=False)
        except:
            pass
        super(Video, self).save(**kwargs)
