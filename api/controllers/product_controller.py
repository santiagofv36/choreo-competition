from typing import Annotated, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from repositories.auth_repository import AuthRepository
from schemas.schemas import ProductBase, UserBase
from dependencies import get_db
from repositories.product_repository import ProductRepository
from dtos.product import CreateProductRequest, CreateReviewRequest
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
    search: Optional[str] = None,
    category_id: Optional[UUID] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    page: int = 1,
    perPage: int = 8,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.get_products(
        db,
        page=page,
        perPage=perPage,
        search=search,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
    )


@router.get("/featured")
async def get_featured(
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.get_featured_products(db)


@router.get("/popular")
async def get_popular_products(
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.get_popular_products(db)


@router.get("/{id}")
async def get_product(
    id: UUID,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    product = await prod_repo.get_product(db, id=id)

    # print(product)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
        )

    return product


@router.post("/{id}/review")
async def review_product(
    id: UUID,
    review: CreateReviewRequest,
    current_user: UserBase = Depends(AuthRepository.get_current_user),
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.review_product(current_user, db, id, review)


@router.get("/{id}/reviews")
async def get_product_reviews_pagination(
    id: UUID,
    page: int = 1,
    perPage: int = 4,
    db: Session = Depends(get_db),
    prod_repo: ProductRepository = Depends(ProductRepository),
):
    return await prod_repo.get_product_reviews_pagination(db, id, page, perPage)
