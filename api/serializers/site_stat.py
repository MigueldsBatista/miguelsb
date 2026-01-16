from rest_framework import serializers

from api.models import SiteStat


class SiteStatSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo SiteStat (Singleton).
    """

    class Meta:
        model = SiteStat
        fields = ['button_clicks', 'total_visitors', 'updated_at']

