# Generated by Django 3.0.3 on 2020-08-30 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(blank=True, max_length=500, null=True, upload_to='users/pictures/', verbose_name='profile picture'),
        ),
    ]
