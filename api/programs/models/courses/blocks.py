"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class CourseBlock(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)

    name = models.CharField(max_length=100)

    picture = models.ImageField(
        'profile picture',
        upload_to='programs/courses/pictures/',
        blank=True, null=True,
        max_length=500
    )
    video_presentation = models.FileField(
        'profile video',
        upload_to='programs/courses/blocks/videos/',
        blank=True,
        null=True,
        max_length=500
    )
    lectures = models.ManyToManyField(
        'programs.CourseLecture', through='programs.CourseLectureTrack')
    course = models.ForeignKey(
        'programs.Course', on_delete=models.CASCADE, related_name='block_course')

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):
        try:
            this = CourseBlock.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        try:
            this = CourseBlock.objects.get(id=self.id)
            if this.video_presentation != self.video_presentation:
                this.video_presentation.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not CourseBlock.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseBlock, self).save(**kwargs)


class CourseLectureTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    block = models.ForeignKey(
        'programs.CourseBlock', on_delete=models.CASCADE)
    lecture = models.ForeignKey(
        'programs.CourseLecture', on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        ordering = ['position']

    def __str__(self):
        """Return description."""
        return '{}'.format(self.block)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not CourseLectureTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseLectureTrack, self).save(**kwargs)
