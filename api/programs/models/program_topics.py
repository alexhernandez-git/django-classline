"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string

import uuid


class ProgramTopic(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='category_videos_user')
    teacher = models.ForeignKey(
        'users.Teacher', on_delete=models.CASCADE, related_name='category_videos_teacher')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE)
    picture = models.ImageField(
        'profile picture',
        upload_to='topics/pictures/',
        blank=True, null=True,
        max_length=500
    )
    videos = models.ManyToManyField(
        'programs.Video',
        through='programs.VideoTopic'
    )
    playlists = models.ManyToManyField(
        'programs.PlaylistAdmin',
        through='programs.PlaylistTopic'
    )
    podcasts = models.ManyToManyField(
        'programs.Podcast',
        through='programs.PodcastTopic'
    )
    color = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not ProgramTopic.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = ProgramTopic.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        super(ProgramTopic, self).save(**kwargs)
