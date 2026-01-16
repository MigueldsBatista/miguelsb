from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.models.certification import Certification
from api.serializers.certification import CertificationSerializer


class CertificationViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Inherited methods: Create, Retrieve, Update, Destroy, List
