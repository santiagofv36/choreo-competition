from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config_db import Base, engine
from controllers.auth_controller import router as auth_router
from controllers.product_controller import router as prod_router
from controllers.category_controller import router as cat_router


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
    
    app.include_router(auth_router)
    app.include_router(cat_router)
    app.include_router(prod_router)

    return app


app = get_application()


@app.get("/")
def home():
    return {"message": "Hello World"}
