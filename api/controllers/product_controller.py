from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from schemas.schemas import ProductBase
from dependencies import get_db
from repositories.product_repository import ProductRepository
from dtos.product import CreateProductRequest
from uuid import UUID
from utils import PaginatedResponse

router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_product(
    create_product_request: CreateProductRequest,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    """Creates a new product"""

    product = await prod_repo.create_product(db, create_product_request)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )

    return product


@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    id: UUID,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    await prod_repo.delete_product(db, id=id)


@router.get("")
async def get_products_pagination(
    page: int = 1,
    perPage: int = 8,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.get_products(db, page=page, perPage=perPage)
