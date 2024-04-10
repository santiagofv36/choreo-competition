from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

"""
    Todas las clases que tienen de postfix Base son clases a nivel de dominio y las clases que tienen el postfix de InDB son clases a nivel de base de datos.
"""


class UserBase(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    name: Optional[str]


class UserInDB(UserBase):
    user_id: Optional[str]
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    name: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    category: Optional[str]
    stock: Optional[int]
    availability: Optional[bool]


class ProductInDB(ProductBase):
    product_id: Optional[str]
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    category: Optional[str]
    stock: Optional[int]
    availability: Optional[bool]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ProductImageBase(BaseModel):
    image: Optional[str]


class ProductImageInDB(ProductImageBase):
    product_image_id: Optional[str]
    image: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class CartItemBase(BaseModel):
    product: Optional[ProductInDB]
    quantity: Optional[int]


class CartItemInDB(CartItemBase):
    cart_item_id: Optional[str]
    product: Optional[ProductInDB]
    quantity: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ShoppingCartBase(BaseModel):
    user: Optional[UserInDB]
    products: Optional[List[CartItemInDB]]


class ShoppingCartInDB(ShoppingCartBase):
    shopping_cart_id: Optional[str]
    user: Optional[UserInDB]
    products: Optional[List[CartItemInDB]]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class OrderItemBase(BaseModel):
    product: Optional[ProductInDB]
    quantity: Optional[int]


class OrderItemInDB(OrderItemBase):
    order_item_id: Optional[int]
    product: Optional[ProductInDB]
    quantity: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    user: Optional[UserInDB]
    products: Optional[List[OrderItemInDB]]
    total_amount: Optional[float]
    shipping_address: Optional[str]
    billing_address: Optional[str]
    payment_method: Optional[str]
    order_status: Optional[str]


class OrderInDB(OrderBase):
    order_id: Optional[int]
    user: Optional[UserInDB]
    products: Optional[List[OrderItemInDB]]
    total_amount: Optional[float]
    shipping_address: Optional[str]
    billing_address: Optional[str]
    payment_method: Optional[str]
    order_status: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    product: Optional[ProductInDB]
    user: Optional[UserInDB]
    rating: Optional[int]
    review_text: Optional[str]


class ReviewInDB(ReviewBase):
    review_id: Optional[int]
    product: Optional[ProductInDB]
    user: Optional[UserInDB]
    rating: Optional[int]
    review_text: Optional[str]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True
