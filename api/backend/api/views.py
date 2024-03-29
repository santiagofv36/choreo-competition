from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Product
from rest_framework import generics
from .serializers import ProductSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class ProductListCreate(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [
        AllowAny,
    ]

    def get_queryset(self):
        return Product.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]
