from django.contrib import admin
from .models import Covid, Disasters, Shops, Config

admin.site.register(Covid)
admin.site.register(Disasters)
admin.site.register(Shops)
admin.site.register(Config)
