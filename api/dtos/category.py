from pydantic import BaseModel

class CreateCategoryRequest(BaseModel):
    name : str