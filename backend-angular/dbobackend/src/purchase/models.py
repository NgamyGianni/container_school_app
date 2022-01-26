from email.policy import default
from django.db import models
from datetime import datetime

# Create your models here.


class Purchase(models.Model):
    category = models.IntegerField(default=-1)
    price = models.FloatField(default=0.0)
    owner = models.CharField(max_length=100, default='')
    name = models.CharField(max_length=100, default='')
    quantity_sold = models.IntegerField(default=0)
    date = models.DateField(default=str(datetime.now())[0:10])

    class Meta:
        ordering = ('date',)
