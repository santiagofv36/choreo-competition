from pydantic import BaseModel

class CreateProductRequest(BaseModel):
    name: str
    description: str
    price : float
    category_id: str
    stock : int
    availability : bool