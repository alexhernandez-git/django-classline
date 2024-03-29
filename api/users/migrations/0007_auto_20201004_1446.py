# Generated by Django 3.0.3 on 2020-10-04 12:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0012_auto_20201004_1446'),
        ('users', '0006_auto_20201001_0051'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchasedItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Date time on which the object was created.', verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now=True, help_text='Date time on which the object was last modified.', verbose_name='modified at')),
                ('invoice_item_id', models.CharField(blank=True, max_length=100, null=True)),
                ('invoice_id', models.CharField(blank=True, max_length=100, null=True)),
                ('product', models.CharField(blank=True, max_length=100, null=True)),
                ('payment_issue', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=True)),
                ('refunded', models.BooleanField(default=False)),
                ('is_a_purchased_event', models.BooleanField(default=False)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Event')),
                ('program', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Program')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='profile',
            name='purchased_items',
            field=models.ManyToManyField(blank=True, related_name='student_purchased_items', to='users.PurchasedItem'),
        ),
    ]
