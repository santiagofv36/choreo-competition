from pydantic import BaseModel

class CreateCartItemRequest(BaseModel):
    product_id       : str
    shopping_cart_id : str
    quantity         : int