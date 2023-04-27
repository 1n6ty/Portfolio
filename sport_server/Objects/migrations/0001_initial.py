# Generated by Django 4.0.2 on 2023-03-03 20:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sport_object',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.JSONField(default={'en': '', 'ru': ''})),
                ('active', models.BooleanField()),
                ('short_info', models.JSONField(default={'en': '', 'ru': ''})),
                ('detail_info', models.JSONField(default={'en': '', 'ru': ''})),
                ('address', models.JSONField(default={'en': '', 'ru': ''})),
                ('FCP', models.JSONField(default={'en': '', 'ru': ''})),
                ('actions', models.JSONField(default={'en': '', 'ru': ''})),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('finances', models.JSONField(default={'all': 0, 'f': 0, 'm': 0, 'p': 0, 's': 0})),
                ('curator', models.JSONField(default={'en': '', 'ru': ''})),
                ('curator_address', models.JSONField(default={'en': '', 'ru': ''})),
                ('curator_phone', models.CharField(default='', max_length=20)),
                ('object_phone', models.CharField(default='', max_length=20)),
                ('working_regime', models.TextField(default='')),
                ('working_regime_sat', models.TextField(default='')),
                ('working_regime_sun', models.TextField(default='')),
                ('email', models.EmailField(default='', max_length=254)),
                ('object_type', models.JSONField(default={'en': '', 'ru': ''})),
                ('object_sports', models.JSONField(default={'en': '', 'ru': ''})),
                ('ymap', models.JSONField(default={'x': 0, 'y': 0})),
            ],
        ),
    ]
