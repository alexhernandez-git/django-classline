# Generated by Django 3.0.3 on 2020-10-06 13:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0015_event_event_buyed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='backgroundColor',
            new_name='color',
        ),
    ]
