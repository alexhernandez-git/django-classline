# Generated by Django 3.0.3 on 2020-10-22 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0022_auto_20201018_0718'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='online_class',
            field=models.BooleanField(default=True),
        ),
    ]
