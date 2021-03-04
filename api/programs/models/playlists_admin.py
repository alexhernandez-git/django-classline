"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class PlaylistAdmin(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    picture = models.ImageField(
        'playlist picture',
        upload_to='programs/playlists_admin/pictures/',
        blank=True, null=True,
        max_length=500
    )
    name = models.CharField(max_length=100)
    tracks = models.ManyToManyField(
        'programs.Video', through='PlaylistAdminTrack')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_playlist_admin')

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        try:
            this = PlaylistAdmin.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not PlaylistAdmin.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(PlaylistAdmin, self).save(**kwargs)


class PlaylistAdminTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    playlist = models.ForeignKey(
        'programs.PlaylistAdmin', on_delete=models.CASCADE)
    video = models.ForeignKey('programs.Video', on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        ordering = ['position']

    def __str__(self):
        """Return description."""
        return '{}'.format(self.playlist)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not PlaylistAdminTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(PlaylistAdminTrack, self).save(**kwargs)
