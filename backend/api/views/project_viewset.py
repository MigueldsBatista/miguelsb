from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models.project import Project
from api.serializers.project import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Inherited methods: Create, Retrieve, Update, Destroy, List
