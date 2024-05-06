from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.cartitem_repository import CartItemRepository
from repositories.auth_repository import AuthRepository
from schemas.schemas import UserBase
from repositories.shopping_cart_repository import ShoppingCartRepository
from dependencies import get_db
from dtos.cartitem import AddItemToCartRequest

router = APIRouter(
    prefix="/user",
    tags=["user"],
)


@router.post("/shopping_cart/add")
async def add_item_to_shopping_cart(
    item_cart: AddItemToCartRequest,
    db: Session = Depends(get_db),
    shopping_cart_repo: ShoppingCartRepository = Depends(ShoppingCartRepository),
    user: UserBase = Depends(AuthRepository.get_current_user),
    cart_repo: CartItemRepository = Depends(CartItemRepository),
):
    """"""
    return await shopping_cart_repo.add_product_to_shopping_cart(db, item_cart, user, cart_repo)
