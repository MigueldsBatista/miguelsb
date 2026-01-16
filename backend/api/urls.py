from django.urls import path
from rest_framework import routers

from api.views import IncrementClickViewSet
from api.views.certification_viewset import CertificationViewSet
from api.views.project_viewset import ProjectViewSet

router = routers.SimpleRouter()
router.register(r'certifications', CertificationViewSet)
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('stats/increment/', IncrementClickViewSet.as_view(), name='increment-click'),
] + router.urls
