# Generated by Django 3.0.3 on 2020-09-29 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('programs', '0006_auto_20200927_1451'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllowedProgram',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4,
                                        editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True,
                                                 help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True,
                                                  help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('is_admin', models.BooleanField(default=False)),
                ('program', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='programs.Program')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4,
                                        editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True,
                                                 help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True,
                                                  help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('is_active', models.BooleanField(default=True)),
                ('admin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                            related_name='instructor_creator', to=settings.AUTH_USER_MODEL)),
                ('allowed_programs', models.ManyToManyField(
                    to='programs.AllowedProgram')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='instructor_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
    ]