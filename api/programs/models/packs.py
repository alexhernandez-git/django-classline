"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string

import uuid


class Pack(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    published = models.BooleanField(default=False)
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='pack_user')
    teacher = models.ForeignKey(
        'users.Teacher', on_delete=models.CASCADE, related_name='pack_teacher')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE)
    are_videos = models.BooleanField(default=True)
    are_playlists = models.BooleanField(default=True)
    are_podcasts = models.BooleanField(default=True)
    are_resources = models.BooleanField(default=True)

    rating = models.FloatField(default=0)
    picture = models.ImageField(
        'profile picture',
        upload_to='packs/pictures/',
        blank=True,
        null=True,
        max_length=500
    )
    students = models.ManyToManyField(
        'users.User',
        through='programs.StudentPack'
    )
    videos = models.ManyToManyField(
        'programs.Video',
        through='programs.VideoPack'
    )
    podcasts = models.ManyToManyField(
        'programs.Podcast',
        through='programs.PodcastPack'
    )

    def __str__(self):
        """Return description."""
        return '{}'.format(self.title)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Pack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = Pack.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass

        super(Pack, self).save(**kwargs)
