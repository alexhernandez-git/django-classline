# Generated by Django 3.0.3 on 2020-10-04 12:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('programs', '0011_program_are_admin_playlists'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='can_be_booked',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='event',
            name='currency',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='current_students',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='program',
            name='event_booking',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='EventStudent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='event',
            name='event_students',
            field=models.ManyToManyField(through='programs.EventStudent', to=settings.AUTH_USER_MODEL),
        ),
    ]
