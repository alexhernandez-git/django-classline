"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class File(CLineModel):

    code = models.CharField(max_length=10, blank=True, null=True)
    name = models.CharField(max_length=100, default='')
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_files')

    is_private = models.BooleanField(default=False)

    file = models.FileField(
        upload_to='programs/documents/files/',
        max_length=500,
    )
    top_folder = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='files_folder', null=True, blank=True)

    shared_users = models.ManyToManyField(
        'users.User'
    )

    def __str__(self):
        """Return description."""
        return '{}'.format(self.name)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not File.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = File.objects.get(id=self.id)
            if this.file != self.file:
                this.file.delete(save=False)
        except:
            pass

        super(File, self).save(**kwargs)
