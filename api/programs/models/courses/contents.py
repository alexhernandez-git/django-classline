"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class LectionContent(CLineModel):
    item = models.OneToOneField(
        'programs.CourseItem', on_delete=models.CASCADE)

    VIDEO = 'VI'
    TEXT = 'TX'
    FILE = 'FI'
    TYPE_CHOICES = [
        (VIDEO, 'Video'),
        (TEXT, 'Text'),
        (FILE, 'File'),
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
    file = models.FileField(
        upload_to='programs/courses/contents/files/',
        max_length=500,
        blank=True,
        null=True,
    )
    text = models.TextField(max_length=5000, blank=True)

    materiales = models.FileField(
        upload_to='programs/courses/contents/materials/',
        max_length=500,
        blank=True,
        null=True,
    )
    duration = models.FloatField(blank=True, null=True)
    mega_bytes = models.FloatField(blank=True, null=True)
    bytes = models.PositiveIntegerField(blank=True, null=True)

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        try:
            this = LectionContent.objects.get(id=self.id)
            if this.video != self.video:
                this.video.delete(save=False)
        except:
            pass
        try:
            this = LectionContent.objects.get(id=self.id)
            if this.file != self.file:
                this.file.delete(save=False)
        except:
            pass

        super(LectionContent, self).save(**kwargs)


class LectionMaterial(CLineModel):
    content = models.ForeignKey(
        'programs.LectionContent', on_delete=models.CASCADE, related_name='course_material_content')

    file = models.FileField(
        upload_to='programs/courses/contents/materials/',
        max_length=500,
        blank=True,
        null=True,
    )

    mega_bytes = models.FloatField(blank=True, null=True)
    bytes = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.bytes)

    def save(self, **kwargs):

        try:
            this = LectionMaterial.objects.get(id=self.id)
            if this.file != self.file:
                this.file.delete(save=False)
        except:
            pass

        super(LectionMaterial, self).save(**kwargs)
