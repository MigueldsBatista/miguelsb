from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()  # Suportará Markdown no frontend
    tech_stack = models.JSONField(help_text="Lista de tecnologias, ex: ['Django', 'Vue']")
    # Links recomendados: github, live_demo
    links = models.JSONField(default=dict)
    order = models.PositiveIntegerField(default=0) # Para ordenar no portfolio
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self) -> str:
        return self.name
