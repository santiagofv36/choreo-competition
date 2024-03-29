from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Product,
    ProductImage,
    ShoppingCart,
    CartItem,
    Order,
    OrderItem,
    Review,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.category = validated_data.get("category", instance.category)
        instance.stock = validated_data.get("stock", instance.stock)
        instance.availability = validated_data.get("availability", instance.availability)
        instance.save()
        return instance
    
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"

    def create(self, validated_data):
        return ProductImage.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product = validated_data.get("product", instance.product)
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance
    
class ShoppingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = "__all__"
        extra_kwargs = {"user": {"read_only": True}}

    def create(self, validated_data):
        return ShoppingCart.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.save()
        return instance
    
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = "__all__"

    def create(self, validated_data):
        return CartItem.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product = validated_data.get("product", instance.product)
        instance.shopping_cart = validated_data.get("shopping_cart", instance.shopping_cart)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()
        return instance
    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.total_amount = validated_data.get("total_amount", instance.total_amount)
        instance.shipping_address = validated_data.get("shipping_address", instance.shipping_address)
        instance.billing_address = validated_data.get("billing_address", instance.billing_address)
        instance.payment_method = validated_data.get("payment_method", instance.payment_method)
        instance.order_status = validated_data.get("order_status", instance.order_status)
        instance.save()
        return instance
    
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

    def create(self, validated_data):
        return OrderItem.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product = validated_data.get("product", instance.product)
        instance.order = validated_data.get("order", instance.order)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()
        return instance
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

    def create(self, validated_data):
        return Review.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.product = validated_data.get("product", instance.product)
        instance.user = validated_data.get("user", instance.user)
        instance.rating = validated_data.get("rating", instance.rating)
        instance.review_text = validated_data.get("review_text", instance.review_text)
        instance.save()
        return instance
    
