from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import SiteStat
from api.serializers import SiteStatSerializer


class IncrementClickViewSet(APIView):
    """
    Endpoint para incrementar o contador global de cliques.
    """
    def post(self, request):
        # Obtém o único registro ou cria um se não existir
        stat, _ = SiteStat.objects.get_or_create(pk=1)
        stat.increment_clicks()
        serializer = SiteStatSerializer(stat)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request):
        # Obtém o único registro de estatísticas do site
        stat, _ = SiteStat.objects.get_or_create(pk=1)

        serializer = SiteStatSerializer(stat)
        return Response(serializer.data, status=status.HTTP_200_OK)
