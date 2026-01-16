from django.core.exceptions import ValidationError
from django.db import models


class SiteStat(models.Model):
    """
    Modelo Singleton para estatísticas globais.
    Garante que só exista um registro no banco.
    """
    button_clicks = models.BigIntegerField(default=0)
    total_visitors = models.BigIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Cliques: {self.button_clicks} | Visitas: {self.total_visitors}"

    def save(self, *args, **kwargs) -> None:
        if not self.pk and SiteStat.objects.exists():
            raise ValidationError("Apenas uma instância de SiteStat é permitida.")
        return super().save(*args, **kwargs)

