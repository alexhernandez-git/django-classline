"""Work experience model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import random
import string

import uuid


class Program(CLineModel):
    """Teaches price model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    code = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    subtitle = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=1000, blank=True, null=True)
    actived = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    user = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='program_user')
    teacher = models.ForeignKey(
        'users.Teacher', on_delete=models.CASCADE, related_name='program_teacher')
    current_accounts = models.PositiveIntegerField(default=0)
    accounts_to_create_left = models.PositiveIntegerField(default=0)
    are_meetups = models.BooleanField(default=True)
    are_videos = models.BooleanField(default=True)
    are_courses = models.BooleanField(default=True)
    are_playlists = models.BooleanField(default=True)
    are_admin_playlists = models.BooleanField(default=True)
    are_podcasts = models.BooleanField(default=True)
    are_docs = models.BooleanField(default=True)
    are_forum = models.BooleanField(default=True)

    event_booking = models.BooleanField(default=False)
    event_booking_calendar = models.BooleanField(default=False)

    # accounts
    level_pro = models.BooleanField(default=False)
    level_adquired = models.PositiveIntegerField(null=True, blank=True)
    accounts_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    accounts_subscription_id = models.CharField(
        max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=3, null=True, blank=True)
    rating = models.FloatField(default=0)
    picture = models.ImageField(
        'profile picture',
        upload_to='programs/pictures/',
        blank=True,
        null=True,
        max_length=500
    )
    video_presentation = models.FileField(
        'profile video',
        upload_to='programs/videos/',
        blank=True,
        null=True,
        max_length=500
    )
    students = models.ManyToManyField(
        'users.User',
        through='programs.Student'
    )
    created_accounts = models.ManyToManyField(
        'users.User',
        through='programs.AccountCreated',
        related_name='program_accounts_created'
    )

    def __str__(self):
        """Return description."""
        return '{}'.format(self.title)

    def save(self, **kwargs):

        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not Program.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break
        try:
            this = Program.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        try:
            this = Program.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.video_presentation != self.video_presentation:
                this.video_presentation.delete(save=False)
        except:
            pass
        super(Program, self).save(**kwargs)
