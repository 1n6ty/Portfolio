from django.contrib import admin

from .models import Sport_object

# Register your models here.

class Sport_objects_admin(admin.ModelAdmin):
    pass

admin.site.register(Sport_object, Sport_objects_admin)