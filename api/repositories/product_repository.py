from dependencies import get_db
from models.models import Product,Category
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from dtos.product import CreateProductRequest
from uuid import UUID
from utils import PaginatedResponse

class ProductRepository:

        pagesize = 50

        async def create_product(
                self,
                db: Session,
                product : CreateProductRequest
        ):
                try:
                        created_product = Product(
                                name = product.name,
                                description = product.description,
                                price = product.price,
                                category_id = UUID(product.category_id),
                                stock = product.stock,
                                availability = product.availability
                                )
               
                        db.add(created_product)
                        db.commit()
                        db.refresh(created_product)
                        return created_product
                except HTTPException as error:
                        print(error)
                        return

        async def delete_product(
                        self,
                        db : Session,
                        id : str
        ):
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
                db : Session,
                page : int   
        ):
                try:
                        response = PaginatedResponse(
                                query = db.query(Product),
                                pagesize = self.pagesize
                        )
                        paginated_products = response.get_paginated_results(page=page)
                        return paginated_products
                except HTTPException as error:
                        print(error)
                        return
                
            