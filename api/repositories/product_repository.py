from dependencies import get_db
from models.models import Product,Category
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from dtos.product import CreateProductRequest
from uuid import UUID

class ProductRepository:
    async def create_product(
                self,
                db: Session,
                product : CreateProductRequest
        ):
                try:
                        ''' Fetch the category '''
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
            