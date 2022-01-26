from django.urls import path
from purchase import views

urlpatterns = [
    path('purchases/', views.PurchaseList.as_view()),
    path('purchase/<int:pk>/', views.PurchaseDetail.as_view()),
]