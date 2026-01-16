from django.core.exceptions import ValidationError
from django.db import models


class Certification(models.Model):
    title: models.CharField = models.CharField(max_length=255)
    issuer: models.CharField = models.CharField(max_length=255)
    issue_date: models.DateField = models.DateField()
    credential_id: models.CharField = models.CharField(max_length=255, blank=True)
    credential_url: models.URLField = models.URLField(blank=True)

    def __str__(self) -> str:
        return f"{self.title} - {self.issuer}"

class SiteStat(models.Model):
    """
    Modelo Singleton para estatísticas globais.
    Garante que só exista um registro no banco.
    """
    button_clicks: models.BigIntegerField = models.BigIntegerField(default=0)
    total_visitors: models.BigIntegerField = models.BigIntegerField(default=0)
    updated_at: models.DateTimeField = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Cliques: {self.button_clicks} | Visitas: {self.total_visitors}"

    def save(self, *args, **kwargs) -> None:
        if not self.pk and SiteStat.objects.exists():
            raise ValidationError("Apenas uma instância de SiteStat é permitida.")
        return super().save(*args, **kwargs)

