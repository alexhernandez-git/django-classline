"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string


class ItemQuestion(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100)
    question = models.TextField(max_length=1000)
    item = models.ForeignKey(
        'programs.CourseItem', on_delete=models.CASCADE, related_name='item_question')
    course = models.ForeignKey(
        'programs.Course', on_delete=models.CASCADE, related_name='couse_question')

    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='question_user')

    def __str__(self):
        """Return description."""
        return '{}'.format(self.question)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not ItemQuestion.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        super(ItemQuestion, self).save(**kwargs)
