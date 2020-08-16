"""User model."""

# Django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

# Utilities
from api.utils.models import CLineModel
import random
import string


class User(CLineModel, AbstractUser):
    """User model.
    Extend from Django's Abstract User, change the username field
    to email and add some extra fields.
    """
    code = models.CharField(max_length=10, blank=True, null=True)

    email = models.EmailField(
        'email address',
        unique=True,
        error_messages={
            'unique': 'A user with that email already exists.'
        },
        blank=True
    )
    username = models.CharField(
        max_length=150,
        unique=True,
    )

    phone_regex = RegexValidator(
        regex=r'\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: +999999999. Up to 15 digits allowed."
    )
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True)

    # USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    is_client = models.BooleanField(
        'client',
        default=True,
        help_text=(
            'Help easily distinguish users and perform queries. '
            'Clients are the main type of user.'
        )
    )

    is_verified = models.BooleanField(
        'verified',
        default=False,
        help_text='Set to true when the user have verified its email address.'
    )

    created_account = models.BooleanField(
        default=False,
        help_text='This account has created by academy owner'
    )

    first_password = models.CharField(max_length=40, null=True, blank=True)
    password_changed = models.BooleanField(

        default=False
    )

    def __str__(self):
        """Return username."""
        return '{} {}'.format(self.first_name, self.last_name)

    def get_short_name(self):
        """Return username."""
        return self.username

    def save(self, **kwargs):
        if not self.code:
            while True:
                slug_name = ''.join(random.choice(
                    string.ascii_letters + string.digits) for _ in range(10))
                if not User.objects.filter(code=slug_name).exists():
                    self.code = slug_name
                    break

        super(User, self).save(**kwargs)
