# Generated by Django 3.0.3 on 2020-10-18 06:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0022_auto_20201018_0718'),
        ('users', '0008_userloginactivity'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchaseditem',
            name='is_student_purchased_pack',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='purchaseditem',
            name='pack',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Pack'),
        ),
    ]
