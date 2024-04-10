from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Integer,
    String,
    Uuid,
    Float,
    ForeignKey,
)
from sqlalchemy.orm import relationship
import datetime
from config_db import Base
import uuid


"""
Modelo de la tabla de User
"""


class User(Base):
    __tablename__ = "users"

    user_id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    shopping_cart = relationship("ShoppingCart", back_populates="user")
    orders = relationship("Order", back_populates="user")
    reviews = relationship("Review", back_populates="user")


"""
Modelo de la tabla de Product
"""


class Product(Base):
    __tablename__ = "products"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    stock = Column(Integer)
    availability = Column(Boolean)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    images = relationship("ProductImage", back_populates="product")
    cart_items = relationship("CartItem", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")
    reviews = relationship("Review", back_populates="product")


"""
Modelo de la tabla de ProductImage
"""


class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    product_id = Column(Uuid, ForeignKey("products.id"))
    image = Column(String)

    product = relationship("Product", back_populates="images")

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)


"""
Modelo de la tabla de ShoppingCart
"""


class ShoppingCart(Base):
    __tablename__ = "shopping_carts"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(Uuid, ForeignKey("users.user_id"))

    user = relationship("User", back_populates="shopping_cart")
    products = relationship("CartItem", back_populates="shopping_cart")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)


"""
Modelo de la tabla de CartItem
"""


class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    product_id = Column(Uuid, ForeignKey("products.id"))
    shopping_cart_id = Column(Uuid, ForeignKey("shopping_carts.id"))
    quantity = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    product = relationship("Product", back_populates="cart_items")
    shopping_cart = relationship("ShoppingCart", back_populates="products")


"""
Modelo de la tabla de Order
"""


class Order(Base):
    __tablename__ = "orders"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    user_id = Column(Uuid, ForeignKey("users.user_id"))
    total_amount = Column(Float)
    shipping_address = Column(String)
    billing_address = Column(String)
    payment_method = Column(String)
    order_status = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")
    products = relationship("OrderItem", back_populates="order")


"""
Modelo de la tabla de OrderItem
"""


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    product_id = Column(Uuid, ForeignKey("products.id"))
    order_id = Column(Uuid, ForeignKey("orders.id"))
    quantity = Column(Integer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    product = relationship("Product", back_populates="order_items")
    order = relationship("Order", back_populates="products")


"""
Modelo de la tabla de Review
"""


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4())
    product_id = Column(Uuid, ForeignKey("products.id"))
    user_id = Column(Uuid, ForeignKey("users.user_id"))
    rating = Column(Integer)
    review_String = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    product = relationship("Product", back_populates="reviews")
    user = relationship("User", back_populates="reviews")
