from django.db import models


class Certification(models.Model):
    title: models.CharField = models.CharField(max_length=255)
    issuer: models.CharField = models.CharField(max_length=255)
    issue_date: models.DateField = models.DateField()
    credential_id: models.CharField = models.CharField(max_length=255, blank=True)
    credential_url: models.URLField = models.URLField(blank=True)

    def __str__(self) -> str:
        return f"{self.title} - {self.issuer}"
