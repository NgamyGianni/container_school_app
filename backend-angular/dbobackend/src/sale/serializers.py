from rest_framework.serializers import ModelSerializer
from sale.models import Sale


class SaleSerialisers(ModelSerializer):
    class Meta:
        model = Sale
        fields = ('id', 'category', 'price', 'owner',
                  'name', 'quantity_sold', 'date')
