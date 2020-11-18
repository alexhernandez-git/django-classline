"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class LectureContent(CLineModel):

    item = models.OneToOneField(
        'programs.CourseItem', on_delete=models.CASCADE)

    course = models.ForeignKey('programs.Course', on_delete=models.CASCADE)

    VIDEO = 'VI'
    TEXT = 'TX'
    TYPE_CHOICES = [
        (VIDEO, 'Video'),
        (TEXT, 'Text'),
    ]
    type_choices = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
    )
    video = models.FileField(
        'profile video',
        upload_to='programs/courses/contents/videos/',
        blank=True,
        null=True,
        max_length=500
    )
    name =  models.CharField(max_length=500, blank=True, null=True)

    text = models.TextField(max_length=5000, blank=True)

    duration = models.FloatField(blank=True, null=True)
    mega_bytes = models.FloatField(blank=True, null=True)
    bytes = models.PositiveIntegerField(blank=True, null=True)

    description = models.TextField(max_length=1000, blank=True)

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.item)

    def save(self, **kwargs):

        try:
            this = LectureContent.objects.get(id=self.id)
            if this.video != self.video:
                this.video.delete(save=False)
        except:
            pass

        super(LectureContent, self).save(**kwargs)


class LectureMaterial(CLineModel):
    item = models.ForeignKey(
        'programs.CourseItem', on_delete=models.CASCADE, related_name='course_material_item')
    course = models.ForeignKey('programs.Course', on_delete=models.CASCADE)
    file = models.FileField(
        upload_to='programs/courses/contents/materials/',
        max_length=500,

    )

    name =  models.CharField(max_length=500)
    mega_bytes = models.FloatField(blank=True, null=True)
    bytes = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.bytes)

    def save(self, **kwargs):

        try:
            this = LectureMaterial.objects.get(id=self.id)
            if this.file != self.file:
                this.file.delete(save=False)
        except:
            pass

        super(LectureMaterial, self).save(**kwargs)
