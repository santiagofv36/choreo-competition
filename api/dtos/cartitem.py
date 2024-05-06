from pydantic import BaseModel

class CreateCartItemRequest(BaseModel):
    product_id       : str
    shopping_cart_id : str
    quantity         : int

class AddItemToCartRequest(BaseModel):
    product_id : str
    quantity   : int