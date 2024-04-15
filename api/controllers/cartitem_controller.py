from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from dependencies import get_db
from repositories.cartitem_repository import CartItemRepository
from dtos.cartitem import CreateCartItemRequest
from uuid import UUID
from utils import PaginatedResponse

router = APIRouter(
    prefix="/cartitem",
    tags=["cartitem"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_cartitem(
    create_cartitem_request: CreateCartItemRequest,
    db: Session = Depends(get_db),
    cart_repo : CartItemRepository = Depends(CartItemRepository)
):
    """ Adds product to Shopping Cart """

    cartitem = await cart_repo.create_cartitem(db,create_cartitem_request)

    if not cartitem:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )
    
    return cartitem

@router.delete("/delete/{id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_cartitem(
    id : UUID,
    db : Session = Depends(get_db),
    prod_repo : CartItemRepository = Depends(CartItemRepository)
):
    await prod_repo.delete_cartitem(db,id=id)

@router.get("")
async def get_cartitems_page(
    page : int,
    db : Session = Depends(get_db),
    prod_repo : CartItemRepository = Depends(CartItemRepository)
):
    cartitems = await prod_repo.get_cartitems(db,page=page)
    return cartitems