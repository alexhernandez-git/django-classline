"""Profile model."""

# Django
from django.db import models

# Utilities
from api.utils.models import CLineModel

import uuid


class Profile(CLineModel):
    """Profile model.
    A profile holds a user's public data like biography, picture,
    and statistics.
    """
    user = models.OneToOneField('users.User', on_delete=models.CASCADE)

    picture = models.ImageField(
        'profile picture',
        upload_to='users/pictures/',
        blank=True,
        null=True
    )
    biography = models.TextField(max_length=1000, blank=True)

    is_teacher = models.BooleanField(default=False)

    language = models.CharField(max_length=20, blank=True, null=True)

    country = models.CharField(max_length=20, blank=True, null=True)

    money_balance = models.FloatField(blank=True, null=True)

    is_enterprise = models.BooleanField(default=False)

    company_name = models.CharField(max_length=50, blank=True, null=True)

    stripe_account_id = models.CharField(max_length=100, blank=True, null=True)

    stripe_account = models.BooleanField(default=False)

    stripe_customer_id = models.CharField(
        max_length=100, blank=True, null=True)

    stripe_customer = models.BooleanField(default=False)

    subscriptions = models.ManyToManyField(
        'users.Subscription', related_name='student_subscriptions', blank=True)

    def __str__(self):
        """Return user's str representation."""
        return str(self.user)

    def save(self, **kwargs):
        try:
            this = Profile.objects.get(id=self.id)
            # import pdb
            # pdb.set_trace()
            if this.picture != self.picture:
                this.picture.delete(save=False)
        except:
            pass
        super(Profile, self).save(**kwargs)
