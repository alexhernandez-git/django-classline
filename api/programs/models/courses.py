"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Course(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    picture = models.ImageField(
        'profile picture',
        upload_to='programs/courses/pictures/',
        blank=True, null=True,
        max_length=500
    )
    name = models.CharField(max_length=100)
    tracks = models.ManyToManyField('programs.Video', through='CourseTrack')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_course')

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        try:
            this = Course.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Course.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(Course, self).save(**kwargs)


class CourseTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    Course = models.ForeignKey('programs.Course', on_delete=models.CASCADE)
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
                if not CourseTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseTrack, self).save(**kwargs)
