from django.db import models

from datetime import datetime
# Create your models here.

class Sport_object(models.Model):
    name = models.JSONField(default={"ru": '', "en": ''})
    active = models.BooleanField(default=False)
    short_info = models.JSONField(default={"ru": '', "en": ''})
    detail_info = models.JSONField(default={"ru": '', "en": ''})
    address = models.JSONField(default={"ru": '', "en": ''})
    FCP = models.JSONField(default={"ru": '', "en": ''})
    actions = models.JSONField(default={"ru": '', "en": ''})
    start_date = models.DateField(default=datetime.now(), null=True, blank=True)
    end_date = models.DateField(default=datetime.now(), null=True, blank=True)
    finances = models.JSONField(default={"all": 0, "f": 0, 's': 0, 'm': 0, 'p': 0})

    curator = models.JSONField(default={"ru": '', "en": ''})
    curator_address = models.JSONField(default={"ru": '', "en": ''})
    curator_phone = models.CharField(max_length=20, default='')

    object_phone = models.CharField(max_length=20, default='')
    working_regime = models.TextField(default='')
    working_regime_sat = models.TextField(default='')
    working_regime_sun = models.TextField(default='')
    email = models.EmailField(default='')
    object_type = models.JSONField(default={"ru": '', "en": ''})
    object_sports = models.JSONField(default={"ru": '', "en": ''})

    ymap = models.JSONField(default={'x': 0, 'y': 0})