from schemas.schemas import UserBase
from dependencies import get_db
from models.models import Product, Category, ProductImage, Review, User
from sqlalchemy import func, select
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
            """"""

            product_with_rating = (
                db.query(Product, func.avg(Review.rating).label("average_rating"))
                .options(
                    subqueryload(Product.images).load_only(ProductImage.image),
                )
                .join(Review, Product.id == Review.product_id)
                .filter(Product.id == id)
                .group_by(Product.id)
                .order_by(func.avg(Review.rating).desc())
                .first()
            )

            product = product_with_rating[0]
            product.average_rating = product_with_rating[1]

            return product

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

    async def get_featured_products(self, db: Session):
        try:
            """"""
            # the way to calculate if a product is featured is based on two factors the ammount of reviews and the overall rating
            query = (
                db.query(
                    Product,
                )
                .options(subqueryload(Product.images).load_only(ProductImage.image))
                .join(Review, Product.id == Review.product_id)
                .group_by(Product.id, Product.name)
                .having(func.avg(Review.rating) > 3)
                .order_by(func.avg(Review.rating).desc())
                .limit(4)
            )
            return query.all()

        except HTTPException as error:
            print(error)
            return

    async def get_popular_products(self, db: Session):
        """Get the most popular products based on the ammount of reviews"""
        try:
            query = (
                db.query(
                    Product,
                )
                .options(subqueryload(Product.images).load_only(ProductImage.image))
                .join(Review, Product.id == Review.product_id)
                .group_by(Product.id, Product.name)
                .order_by(func.count(Review.id).desc())
                .limit(8)
            )
            return query.all()

        except HTTPException as error:
            print(error)
            return
