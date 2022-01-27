from product.models import Product
from product.serializers import ProductSerialisers
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class ProductDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return Product.objects.get(id=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerialisers(product)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        serializer = ProductSerialisers(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductList(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    # def get_object(self, pk):
    #     try:
    #         return Product.objects.get(id=pk)
    #     except Product.DoesNotExist:
    #         raise Http404

    def get(self, request, format=None):
        productlist = Product.objects.all()
        serializer = ProductSerialisers(productlist, many=True)
        print(serializer.data)
        return Response(serializer.data)
