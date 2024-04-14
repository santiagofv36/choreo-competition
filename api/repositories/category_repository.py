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
        async def delete_category(
                self,
                db : Session,
                id : str
        ):
                try:
                        category_to_delete = db.query(Category).get(id)
                        db.delete(category_to_delete)
                        db.commit()
                        return
                except HTTPException as error:
                        print(error)
                        return
        
        async def get_categories(
                self,
                db : Session
        ):
                try:
                        categories = db.query(Category).all()
                        return categories
                except HTTPException as error:
                        print(error)
                        return

                        
            