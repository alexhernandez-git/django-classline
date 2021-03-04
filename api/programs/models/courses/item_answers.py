"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class ItemAnswer(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    message = models.TextField(max_length=1000)
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='user_answer')
    question = models.ForeignKey(
        'programs.ItemQuestion', on_delete=models.CASCADE, related_name='question_answer')
    class Meta:
        ordering = ['created']
    def __str__(self):
        """Return description."""
        return '{}'.format(self.message)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not ItemAnswer.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        super(ItemAnswer, self).save(**kwargs)
