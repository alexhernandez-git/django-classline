# Generated by Django 3.0.3 on 2020-09-25 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0004_auto_20200925_1853'),
    ]

    operations = [
        migrations.AddField(
            model_name='program',
            name='are_playlists',
            field=models.BooleanField(default=True),
        ),
    ]
