from pydantic import BaseModel

class CreateProductImageRequest(BaseModel):
    product_id : str
    image      : str