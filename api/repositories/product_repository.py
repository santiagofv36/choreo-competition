from dependencies import get_db
from models.models import Product
from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from dtos.product import CreateProductRequest

class ProductRepository:
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
                                category_id = product.category_id,
                                stock = product.stock,
                                availability = product.availability
                                )
               
                        db.add(created_product)
                        db.commit()
                        db.refresh(created_product)
                        return created_product
                except:
                        return
            