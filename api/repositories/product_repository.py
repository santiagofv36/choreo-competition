from schemas.schemas import UserBase
from dependencies import get_db
from models.models import Product, Category, ProductImage, Review, User
from sqlalchemy import select
from sqlalchemy.orm import Session, subqueryload
from fastapi import HTTPException, status
from dtos.product import CreateProductRequest, CreateReviewRequest
from uuid import UUID, uuid4
from utils import PaginatedResponse


class ProductRepository:

    async def create_product(self, db: Session, product: CreateProductRequest):
        try:
            created_product = Product(
                id=uuid4(),
                name=product.name,
                description=product.description,
                price=product.price,
                category_id=UUID(product.category_id),
                stock=product.stock,
                availability=product.availability,
            )

            db.add(created_product)
            db.commit()
            db.refresh(created_product)
            return created_product
        except HTTPException as error:
            print(error)
            return

    async def delete_product(self, db: Session, id: str):
        try:
            product_to_delete = db.query(Product).get(id)
            db.delete(product_to_delete)
            db.commit()
            return
        except HTTPException as error:
            print(error)
            return

    async def get_products(self, db: Session, page: int, perPage: int):
        try:
            query = db.query(Product).options(
                subqueryload(Product.images).load_only(ProductImage.image),
            )
            response = PaginatedResponse(query=query, pagesize=perPage)
            return response.get_paginated_results(page=page)
        except HTTPException as error:
            print(error)
            return

    async def get_product(self, db: Session, id: str):
        try:
            return (
                db.query(Product)
                .options(
                    subqueryload(Product.images).load_only(ProductImage.image),
                )
                .filter(Product.id == id)
                .first()
            )
        except HTTPException as error:
            print(error)
            return

    async def review_product(
        self, current_user: UserBase, db: Session, id: str, review: CreateReviewRequest
    ):
        """"""
        try:
            product = db.query(Product).filter(Product.id == id).first()

            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Product not found"
                )

            create_review = Review(
                id=uuid4(),
                product_id=product.id,
                rating=review.rating,
                review_String=review.comment,
                user_id=current_user.user_id,
            )

            db.add(create_review)
            db.commit()
            db.refresh(create_review)
            return create_review

        except HTTPException as error:
            print(error)
            return

    async def get_product_reviews_pagination(
        self, db: Session, id: str, page: int, perPage: int
    ):
        try:
            query = (
                db.query(Review)
                .options(
                    subqueryload(Review.user).load_only(User.username, User.name),
                )
                .filter(Review.product_id == id)
            )
            response = PaginatedResponse(query=query, pagesize=perPage)
            return response.get_paginated_results(page=page)
        except HTTPException as error:
            print(error)
            return
