from rest_framework import serializers

from api.models.project import Project


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo Project.
    Trata campos JSON de tech_stack e links automaticamente.
    """
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'tech_stack',
            'links', 'order', 'is_featured', 'created_at'
        ]
