from typing import Optional
from repositories.auth_repository import AuthRepository
from schemas.schemas import UserBase
from dependencies import get_db
from models.models import Product, Category, ProductImage, Review, User
from sqlalchemy import func, or_, select
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

    async def get_products(
        self,
        db: Session,
        page: int,
        perPage: int,
        search: Optional[str] = None,
        category_id: Optional[UUID] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
    ):

        if min_price is not None and max_price is not None:
            if min_price < 0 or max_price < 0:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Price range must be positive",
                )

        try:
            query = db.query(Product).options(
                subqueryload(Product.images).load_only(ProductImage.image),
            )

            if search:
                search_filter = or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.description.ilike(f"%{search}%"),
                    Category.name.ilike(f"%{search}%"),
                )
                query = query.join(Category).filter(search_filter)

            # Apply category_id filter
            if category_id:
                query = query.filter(Product.category_id == category_id)

            # Apply price range filter
            if min_price is not None:
                query = query.filter(Product.price >= min_price)
            if max_price is not None:
                query = query.filter(Product.price <= max_price)

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
            product.rating = product_with_rating[1]

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

            current_user = (
                db.query(User).filter(User.user_id == current_user.user_id).first()
            )

            db.add(create_review)
            db.commit()
            db.refresh(create_review)
            return {
                "id": create_review.id,
                "product_id": create_review.product_id,
                "rating": create_review.rating,
                "review_String": create_review.review_String,
                "created_at": create_review.created_at,
                "user": {"name": current_user.name, "username": current_user.username},
            }

        except HTTPException as error:
            print(error)
            return

    async def get_product_reviews_pagination(
        self, db: Session, id: str, page: int, perPage: int
    ):
        try:
            query = db.query(Review).filter(Review.product_id == id)
            response = PaginatedResponse(query=query, pagesize=perPage)
            reviews = response.get_paginated_results(page=page)

            content_w_user_data = []

            for review in reviews["content"]:
                user = db.query(User).filter(User.user_id == review.user_id).first()
                content_w_user_data.append(
                    {
                        "id": review.id,
                        "product_id": review.product_id,
                        "rating": review.rating,
                        "review_String": review.review_String,
                        "created_at": review.created_at,
                        "user": {"name": user.name, "username": user.username},
                    }
                )

            reviews["content"] = content_w_user_data

            return reviews

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
