from django.contrib import admin

from api.models import Certification, SiteStat
from api.models.project import Project

admin.site.register(Project)
admin.site.register(Certification)
admin.site.register(SiteStat)
