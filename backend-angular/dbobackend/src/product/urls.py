from django.urls import path, include
from product import views

urlpatterns = [
    path('products/', views.ProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    # path('shipPoints/', views.RedirectionListeDeLivraisons.as_view()),
    # path('shipPoint/<int:pk>/', views.RedirectionDetailLivraison.as_view()),
    # path('onsaleproducts/', views.PromoList.as_view()),
    # path('onsaleproduct/<int:pk>/', views.PromoDetail.as_view()),
    # path('availableproducts/', views.ListProduitsDisponibles.as_view()),
    # path('availableproduct/<int:pk>/', views.ProduitDetailDisponible.as_view()),
]
