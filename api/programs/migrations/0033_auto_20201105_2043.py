# Generated by Django 3.0.3 on 2020-11-05 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0032_auto_20201103_1120'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseitem',
            name='type_choices',
            field=models.CharField(blank=True, choices=[('LE', 'Lecture'), ('TE', 'Test')], max_length=2, null=True),
        ),
    ]
