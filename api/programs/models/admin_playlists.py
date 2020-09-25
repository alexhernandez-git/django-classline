"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class AdminPlaylist(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    picture = models.ImageField(
        'profile picture',
        upload_to='programs/courses/pictures/',
        blank=True, null=True,
        max_length=500
    )
    name = models.CharField(max_length=100)
    tracks = models.ManyToManyField(
        'programs.Video', through='AdminPlaylistTrack')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_admin_playlist')

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        try:
            this = AdminPlaylist.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not AdminPlaylist.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(AdminPlaylist, self).save(**kwargs)


class AdminPlaylistTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    course = models.ForeignKey(
        'programs.AdminPlaylist', on_delete=models.CASCADE)
    video = models.ForeignKey('programs.Video', on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        ordering = ['position']

    def __str__(self):
        """Return description."""
        return '{}'.format(self.course)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not AdminPlaylistTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(AdminPlaylistTrack, self).save(**kwargs)
