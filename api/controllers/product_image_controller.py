from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from dependencies import get_db
from repositories.product_image_repository import ProductImageRepository
from dtos.product_image import CreateProductImageRequest
from uuid import UUID
from utils import PaginatedResponse

router = APIRouter(
    prefix="/product_images",
    tags=["product_images"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_product_images(
    create_prodim_request: CreateProductImageRequest,
    db: Session = Depends(get_db),
    prod_repo : ProductImageRepository = Depends(ProductImageRepository)
):
    """ Creates a new product """

    product = await prod_repo.create_product_image(db,create_prodim_request)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )
    
    return product

@router.delete("/delete/{id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_product_image(
    id : UUID,
    db : Session = Depends(get_db),
    prod_repo : ProductImageRepository = Depends(ProductImageRepository)
):
    await prod_repo.delete_product_image(db,id=id)

@router.get("")
async def get_product_images_page(
    page : int,
    db : Session = Depends(get_db),
    prod_repo : ProductImageRepository = Depends(ProductImageRepository)
):
    products = await prod_repo.get_product_images(db,page=page)
    return products
    