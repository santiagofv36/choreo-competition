from dependencies import get_db
from models.models import CartItem
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from dtos.cartitem import CreateCartItemRequest
from uuid import UUID, uuid4
from utils import PaginatedResponse


class CartItemRepository:

    pagesize = 50

    async def create_cartitem(
        self, db: Session, item: CreateCartItemRequest, cart_item: CartItem = None
    ):
        try:
            created_cartitem = CartItem(
                id=uuid4(),
                product_id=UUID(item.product_id),
                shopping_cart_id=UUID(item.shopping_cart_id),
                quantity=item.quantity,
            )

            if cart_item:
                cart_item.quantity += item.quantity
                db.commit()
                db.refresh(cart_item)
                return cart_item

            db.add(created_cartitem)
            db.commit()
            db.refresh(created_cartitem)
            return created_cartitem
        except HTTPException as error:
            print(error)
            return

    async def delete_cartitem(self, db: Session, id: str):
        try:
            product_to_delete = db.query(CartItem).get(id)
            db.delete(product_to_delete)
            db.commit()
            return
        except HTTPException as error:
            print(error)
            return

    async def get_cartitems(self, db: Session, page: int):
        try:
            response = PaginatedResponse(
                query=db.query(CartItem), pagesize=self.pagesize
            )
            paginated_cartitems = response.get_paginated_results(page=page)
            return paginated_cartitems
        except HTTPException as error:
            print(error)
            return
