# Generated by Django 3.0.3 on 2020-10-22 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_auto_20201018_0822'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseditem',
            name='currency',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='purchaseditem',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
