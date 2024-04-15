from dependencies import get_db
from models.models import ProductImage
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from dtos.product_image import CreateProductImageRequest
from utils import PaginatedResponse
import uuid

class ProductImageRepository:

        pagesize = 50

        async def create_product_image(
                self,
                db: Session,
                prod_im : CreateProductImageRequest
        ):
                try:
                        created_prod_im = ProductImage(
                            id = uuid.uuid4(),
                            product_id = uuid.UUID(prod_im.product_id),
                            image = prod_im.image
                            )
               
                        db.add(created_prod_im)
                        db.commit()
                        db.refresh(created_prod_im)
                        return created_prod_im
                except HTTPException as error:
                        print(error)
                        return

        async def delete_product_image(
                        self,
                        db : Session,
                        id : str
        ):
                try:
                        prod_im_to_delete = db.query(ProductImage).get(id)
                        db.delete(prod_im_to_delete)
                        db.commit()
                        return
                except HTTPException as error:
                        print(error)
                        return
        async def get_product_images(
                self,
                db : Session,
                page : int   
        ):
                try:
                        response = PaginatedResponse(
                                query = db.query(ProductImage),
                                pagesize = self.pagesize
                        )
                        paginated_prod_ims = response.get_paginated_results(page=page)
                        return paginated_prod_ims
                except HTTPException as error:
                        print(error)
                        return
                
            