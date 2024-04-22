from dependencies import get_db
from models.models import Product, Category, ProductImage
from sqlalchemy import select
from sqlalchemy.orm import Session, subqueryload
from fastapi import HTTPException, status
from dtos.product import CreateProductRequest
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
                subqueryload(Product.images).load_only(ProductImage.image)
            )
            response = PaginatedResponse(query=query, pagesize=perPage)
            return response.get_paginated_results(page=page)
        except HTTPException as error:
            print(error)
            return
