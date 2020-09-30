# Generated by Django 3.0.3 on 2020-09-30 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0007_allowedprogram_instructor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='instructor',
            name='allowed_programs',
        ),
        migrations.AddField(
            model_name='allowedprogram',
            name='instructor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='programs.Instructor'),
        ),
    ]