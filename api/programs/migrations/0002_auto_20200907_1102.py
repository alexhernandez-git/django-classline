# Generated by Django 3.0.3 on 2020-09-07 09:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0001_initial'),
        ('programs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='rating',
            name='rated_program',
            field=models.ForeignKey(help_text='Program that receives the rating.', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rated_program', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='rating',
            name='rating_user',
            field=models.ForeignKey(help_text='User that emits the rating', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rating_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='rating',
            name='related_instructor',
            field=models.ForeignKey(help_text='Instructor that receives the rating.', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_intructor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='programprice',
            name='program',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='programlanguage',
            name='program',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='program',
            name='created_accounts',
            field=models.ManyToManyField(related_name='program_accounts_created', through='programs.AccountCreated', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='program',
            name='students',
            field=models.ManyToManyField(through='programs.Student', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='program',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_teacher', to='users.Teacher'),
        ),
        migrations.AddField(
            model_name='program',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='podcast',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_podcasts', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='playlisttrack',
            name='playlist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Playlist'),
        ),
        migrations.AddField(
            model_name='playlisttrack',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Video'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_playlist', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='tracks',
            field=models.ManyToManyField(through='programs.PlaylistTrack', to='programs.Video'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_playlist', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='folder',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_folders', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='folder',
            name='shared_users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='folder',
            name='top_folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='folders_folder', to='programs.Folder'),
        ),
        migrations.AddField(
            model_name='file',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_files', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='file',
            name='shared_users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='file',
            name='top_folder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='files_folder', to='programs.Folder'),
        ),
        migrations.AddField(
            model_name='event',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='coursetrack',
            name='course',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Course'),
        ),
        migrations.AddField(
            model_name='coursetrack',
            name='video',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Video'),
        ),
        migrations.AddField(
            model_name='course',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='program_course', to='programs.Program'),
        ),
        migrations.AddField(
            model_name='course',
            name='tracks',
            field=models.ManyToManyField(through='programs.CourseTrack', to='programs.Video'),
        ),
        migrations.AddField(
            model_name='benefit',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='accountcreated',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Program'),
        ),
        migrations.AddField(
            model_name='accountcreated',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
