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
    video_presentation = models.FileField(
        'profile video',
        upload_to='programs/courses/videos/',
        blank=True,
        null=True,
        max_length=500
    )
    title = models.CharField(max_length=60, blank=True, null=True)

    subtitle = models.CharField(max_length=120, blank=True, null=True)

    
    description = models.TextField(max_length=1000, blank=True, null=True)

    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_course')

    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='user_course')

    teacher = models.ForeignKey(
        'users.Teacher', on_delete=models.CASCADE, related_name='course_teacher')

    rating = models.FloatField(default=0)

    students = models.ManyToManyField(
        'users.User',
        through='programs.CourseStudent'
    )

    blocks = models.ManyToManyField(
        'programs.CourseBlock', through='programs.CourseBlockTrack')

    published = models.BooleanField(default=False)
    published_in_program = models.BooleanField(default=False)

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.title)

    def save(self, **kwargs):
        try:
            this = Course.objects.get(id=self.id)
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        try:
            this = Course.objects.get(id=self.id)
            if this.video_presentation != self.video_presentation:
                this.video_presentation.delete(save=False)
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


class CourseBlockTrack(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)
    course = models.ForeignKey(
        'programs.Course', on_delete=models.CASCADE)
    block = models.ForeignKey(
        'programs.CourseBlock', on_delete=models.CASCADE)
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
                if not CourseBlockTrack.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseBlockTrack, self).save(**kwargs)
