# Generated by Django 3.0.3 on 2020-09-25 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0002_auto_20200907_1102'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='is_private',
            field=models.BooleanField(default=False),
        ),
    ]