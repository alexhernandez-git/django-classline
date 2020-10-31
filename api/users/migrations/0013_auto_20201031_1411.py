# Generated by Django 3.0.3 on 2020-10-31 13:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0027_auto_20201031_1411'),
        ('users', '0012_auto_20201030_1635'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseditem',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Course'),
        ),
        migrations.AddField(
            model_name='purchaseditem',
            name='is_student_purchased_course',
            field=models.BooleanField(default=False),
        ),
    ]
