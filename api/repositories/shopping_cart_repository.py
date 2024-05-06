import uuid
from dtos.cartitem import AddItemToCartRequest, CreateCartItemRequest
from repositories.cartitem_repository import CartItemRepository
from dependencies import get_db
from models.models import CartItem, Product, ShoppingCart, User
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status


class ShoppingCartRepository:
    async def create_shopping_cart(self, db: Session, user: User):
        """Crete record"""
        shopping_cart = ShoppingCart(id=uuid.uuid4(), user_id=user.user_id)

        """ Push to database """
        if shopping_cart:
            db.add(shopping_cart)
            db.commit()
            return shopping_cart

        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    async def add_product_to_shopping_cart(
        self,
        db: Session,
        item_cart: AddItemToCartRequest,
        user: User,
        cart_repo: CartItemRepository,
    ):
        """
        Adds a product to the shopping cart of the user
        """
        shopping_cart_id = user.shopping_cart[0].id
        product = db.query(Product).filter(Product.id == item_cart.product_id).first()

        cart_item = (
            db.query(CartItem)
            .filter(
                CartItem.product_id == item_cart.product_id,
                CartItem.shopping_cart_id == str(shopping_cart_id),
            )
            .first()
        )

        if not product:
            raise HTTPException(404, "Product not found")

        if item_cart.quantity > product.stock:
            raise HTTPException(400, "Quantity exceeds stock limit")

        if cart_item and (cart_item.quantity + item_cart.quantity > product.stock):
            raise HTTPException(400, "Quantity exceeds stock limit")

        if item_cart.quantity < 1:
            raise HTTPException(400, "Quantity must be greater than 0")

        cart_item_request = CreateCartItemRequest(
            product_id=item_cart.product_id,
            shopping_cart_id=str(shopping_cart_id),
            quantity=item_cart.quantity,
        )

        cart_item = await cart_repo.create_cartitem(db, cart_item_request,cart_item)

        return cart_item
