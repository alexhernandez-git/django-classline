# Generated by Django 3.0.3 on 2020-11-07 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0028_remove_lecturecontent_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecturecontent',
            name='description',
            field=models.TextField(blank=True, max_length=1000),
        ),
    ]
