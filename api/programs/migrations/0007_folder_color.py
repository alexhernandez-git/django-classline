# Generated by Django 3.0.3 on 2020-09-05 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0006_auto_20200904_1908'),
    ]

    operations = [
        migrations.AddField(
            model_name='folder',
            name='color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
