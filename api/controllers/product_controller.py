from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from schemas.schemas import ProductBase
from dependencies import get_db
from repositories.product_repository import ProductRepository
from dtos.product import CreateProductRequest

router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_product(
    create_product_request: CreateProductRequest,
    db: Session = Depends(get_db),
    prod_repo : ProductRepository = Depends(ProductRepository)
):
    """ Creates a new product """

    product = await prod_repo.create_product(db,create_product_request)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )
    
    return product
