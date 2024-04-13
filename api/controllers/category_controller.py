from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from dependencies import get_db
from repositories.category_repository import CategoryRepository
from dtos.category import CreateCategoryRequest

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_category(
    create_category_request: CreateCategoryRequest,
    db: Session = Depends(get_db),
    prod_repo : CategoryRepository = Depends(CategoryRepository)
):
    """ Creates a new categpry """

    category = await prod_repo.create_category(db,create_category_request)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Category already exists"
        )
    
    return category
