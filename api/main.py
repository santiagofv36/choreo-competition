from uuid import uuid4
from fastapi import FastAPI, status, Depends
from fastapi.middleware.cors import CORSMiddleware

from config_db import Base, engine
from dependencies import get_db
from models.models import Product
from schemas.schemas import ProductBase, ProductInDB


def get_application():
    """
    This method creates the application and returns it.
    """
    Base.metadata.create_all(bind=engine)

    app = FastAPI(
        title="Choreo-Competition-API",
        description="This an API for the Choreo-Competition-App",
        version="0.1.0",
        swagger_ui_parameters={"syntaxHighlight.theme": "obsidian"},
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # TODO: Add routes here
    """
        Example:
        from controllers.products import router as products_router
        app.include_router(products_routers, prefix="/products")
    """

    return app


app = get_application()


@app.post("/test", status_code=status.HTTP_201_CREATED)
async def create_test(product: ProductBase, db=Depends(get_db)):
    """"""
    db_product = Product(
        id=uuid4(),
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        stock=product.stock,
        availability=product.availability,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
