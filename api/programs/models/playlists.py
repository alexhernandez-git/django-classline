"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Playlist(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    picture = models.ImageField(
        'profile picture',
        upload_to='programs/playlists/pictures/',
        blank=True, null=True,
        max_length=500
    )
    name = models.CharField(max_length=100)
    tracks = models.ManyToManyField('programs.Video', through='PlaylistTrack')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_playlist')
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='user_playlist')

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        try:
            this = Playlist.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Playlist.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(Playlist, self).save(**kwargs)


class PlaylistTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    playlist = models.ForeignKey('programs.Playlist', on_delete=models.CASCADE)
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
                if not PlaylistTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(PlaylistTrack, self).save(**kwargs)
