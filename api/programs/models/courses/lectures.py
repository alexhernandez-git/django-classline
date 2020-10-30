"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class CourseLecture(CLineModel):
    code = models.CharField(max_length=10, blank=True, null=True)

    name = models.CharField(max_length=100)

    VIDEO = 'VI'
    TEXT = 'TX'
    FILE = 'FI'
    TEST = 'TE'
    TYPE_CHOICES = [
        (VIDEO, 'Video'),
        (TEXT, 'Text'),
        (FILE, 'File'),
        (TEST, 'Test'),
    ]
    type_choices = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
    )

    video = models.FileField(
        'profile video',
        upload_to='programs/courses/items/videos/',
        blank=True,
        null=True,
        max_length=500
    )
    file = models.FileField(
        upload_to='programs/courses/items/files/',
        max_length=500,
        blank=True,
        null=True,
    )
    text = models.TextField(max_length=5000, blank=True)

    block = models.ForeignKey(
        'programs.CourseBlock', on_delete=models.CASCADE, related_name='item_block')

    is_private = models.BooleanField(default=False)

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        try:
            this = CourseLecture.objects.get(id=self.id)
            if this.video != self.video:
                this.video.delete(save=False)
        except:
            pass
        try:
            this = CourseLecture.objects.get(id=self.id)
            if this.file != self.file:
                this.file.delete(save=False)
        except:
            pass
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not CourseLecture.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(CourseLecture, self).save(**kwargs)
