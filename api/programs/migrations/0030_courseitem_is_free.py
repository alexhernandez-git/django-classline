# Generated by Django 3.0.3 on 2020-12-06 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0029_courseuserdata'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseitem',
            name='is_free',
            field=models.BooleanField(default=False),
        ),
    ]
