# Generated by Django 3.0.3 on 2020-10-30 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_purchaseditem_platform_fee'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userloginactivity',
            options={'ordering': ['-login_datetime'], 'verbose_name': 'user_login_activity', 'verbose_name_plural': 'user_login_activities'},
        ),
    ]
