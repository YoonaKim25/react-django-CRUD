from django.db import models

# Create your models here.
class Post(models.Model):
    who = models.CharField(max_length=500, null=True)
    title = models.CharField(max_length=500)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
