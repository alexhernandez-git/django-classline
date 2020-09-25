# Generated by Django 3.0.3 on 2020-09-25 16:53

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0003_video_is_private'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlaylistAdmin',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('code', models.CharField(blank=True, max_length=10, null=True)),
                ('picture', models.ImageField(blank=True, max_length=500, null=True, upload_to='programs/playlists/pictures/', verbose_name='profile picture')),
                ('name', models.CharField(max_length=100)),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_playlist_admin', to='programs.Program')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='video',
            name='is_private',
        ),
        migrations.CreateModel(
            name='PlaylistAdminTrack',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('code', models.CharField(blank=True, max_length=10, null=True)),
                ('position', models.IntegerField()),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.PlaylistAdmin')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Video')),
            ],
            options={
                'ordering': ['position'],
            },
        ),
        migrations.AddField(
            model_name='playlistadmin',
            name='tracks',
            field=models.ManyToManyField(through='programs.PlaylistAdminTrack', to='programs.Video'),
        ),
    ]
