# Generated by Django 3.0.3 on 2020-11-19 21:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0027_auto_20201119_1546'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemviewed',
            name='is_viewed',
        ),
    ]
