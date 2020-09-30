# Generated by Django 3.0.3 on 2020-09-29 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0007_allowedprogram_instructor'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subscription',
            name='admin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='admin_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='subscription',
            name='is_instructor_accounts_subscription',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subscription',
            name='is_student_accounts_subscription',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subscription',
            name='is_user_to_program_subscription',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='teacher',
            name='accounts_to_create_left',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='teacher',
            name='current_accounts',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='teacher',
            name='instructors',
            field=models.ManyToManyField(blank=True, related_name='instructors_programs', to='programs.Instructor'),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='subscriptions',
            field=models.ManyToManyField(blank=True, related_name='create_accounts_subscription', to='users.Subscription'),
        ),
    ]