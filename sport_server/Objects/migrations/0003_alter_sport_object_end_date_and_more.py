# Generated by Django 4.0.2 on 2023-03-03 21:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Objects', '0002_alter_sport_object_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sport_object',
            name='end_date',
            field=models.DateField(default=datetime.datetime(2023, 3, 4, 4, 1, 17, 444526)),
        ),
        migrations.AlterField(
            model_name='sport_object',
            name='start_date',
            field=models.DateField(default=datetime.datetime(2023, 3, 4, 4, 1, 17, 444526)),
        ),
    ]
