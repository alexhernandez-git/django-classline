"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string

import uuid


class CategoryVideos(CLineModel):
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

    videos = models.ManyToManyField(
        'programs.Video',
        through='programs.VideoCategory'
    )
    playlists = models.ManyToManyField(
        'programs.Playlist',
        through='programs.PlaylistCategory'
    )
    podcasts = models.ManyToManyField(
        'programs.Podcast',
        through='programs.PodcastCategory'
    )

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not CategoryVideos.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        super(CategoryVideos, self).save(**kwargs)
