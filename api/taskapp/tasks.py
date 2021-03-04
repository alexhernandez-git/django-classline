"""Celery tasks."""

# Django
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone


# Celery
from celery.decorators import task

# Utilities
import jwt
import time
from datetime import timedelta

import re


def gen_verification_token(user):
    """Create JWT token that the user can use to verify its account."""
    exp_date = timezone.now() + timedelta(days=3)
    payload = {
        'user': user.username,
        'exp': int(exp_date.timestamp()),
        'type': 'email_confirmation'
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token.decode()


@task(name='send_notification_new_post')
def send_notification_new_post(user, program, post):
    """Send account verification link to given user."""
    subject = '{} ha compartido en el foro:'.format(
        user.username)
    from_email = 'Classline Academy <no-reply@classlineacademy.com>'
    content = render_to_string(
        'emails/programs/forum-notification.html',
        {
            'post': post,
            'program': program,
            'user': user
        }
    )
    students_sp = program.students.through.objects.all().values_list('user__email')
    students_spe = [i[0] for i in students_sp]
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    new_email_ar = []
    for email in students_spe:
        if re.search(regex, email):
            new_email_ar.append(email)
    msg = EmailMultiAlternatives(
        subject, content, from_email, new_email_ar)
    msg.attach_alternative(content, "text/html")
    msg.send()
