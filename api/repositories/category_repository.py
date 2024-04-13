from dependencies import get_db
from models.models import Category
from sqlalchemy.orm import Session
from fastapi import HTTPException,status
from dtos.category import CreateCategoryRequest
import uuid

class CategoryRepository:
    async def create_category(
                self,
                db: Session,
                category : CreateCategoryRequest
        ):
                try:
                        created_category = Category(
                                name = category.name,
                                id = uuid.uuid4()
                            )
               
                        db.add(created_category)
                        db.commit()
                        db.refresh(created_category)
                        return created_category
                except HTTPException as error:
                        print(error)
                        return
            