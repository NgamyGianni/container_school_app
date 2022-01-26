from email.policy import default
from django.db import models

# Create your models here.


class Product(models.Model):
    comments = models.CharField(max_length=100, blank=True, default='')
    category = models.IntegerField(default='-1')
    availability = models.BooleanField(default=True)
    price = models.FloatField(default=0)
    price_on_sale = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    sale = models.BooleanField(default=False)
    owner = models.TextField(max_length=100, default='')
    unit = models.TextField(max_length=10, blank=True, default='')
    name = models.TextField(max_length=100, default='')
    quantity_stock = models.IntegerField(default=0)
    quantity_sold = models.IntegerField(default=0)

    class Meta:
        ordering = ('comments',)
