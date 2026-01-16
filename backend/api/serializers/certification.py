
from rest_framework import serializers

from api.models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Certification.
    """
    class Meta:
        model = Certification
        fields = ['id', 'title', 'issuer', 'issue_date', 'credential_id', 'credential_url']
