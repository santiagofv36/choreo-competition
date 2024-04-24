import uuid
from dependencies import get_db
from models.models import ShoppingCart, User
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


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
