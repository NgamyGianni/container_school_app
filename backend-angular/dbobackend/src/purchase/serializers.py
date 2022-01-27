from rest_framework.serializers import ModelSerializer
from purchase.models import Purchase


class PurchaseSerialisers(ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'category', 'price', 'owner',
                  'name', 'quantity_sold', 'date')
