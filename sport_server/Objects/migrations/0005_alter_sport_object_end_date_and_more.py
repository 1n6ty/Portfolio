# Generated by Django 4.0.2 on 2023-03-03 22:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Objects', '0004_alter_sport_object_end_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sport_object',
            name='end_date',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 3, 4, 5, 3, 57, 753358), null=True),
        ),
        migrations.AlterField(
            model_name='sport_object',
            name='start_date',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 3, 4, 5, 3, 57, 753358), null=True),
        ),
    ]
