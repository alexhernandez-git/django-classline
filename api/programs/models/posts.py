"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class Post(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100)
    message = models.TextField(max_length=1000)
    program = models.ForeignKey(
        'programs.Program', on_delete=models.CASCADE, related_name='program_posts')

    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='post_user')

    def __str__(self):
        """Return description."""
        return '{}'.format(self.message)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Post.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        super(Post, self).save(**kwargs)
