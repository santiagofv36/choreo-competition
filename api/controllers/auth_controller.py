# from typing import Annotated
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from models.models import User
from schemas.schemas import UserBase
from dtos.user import CreateUserRequest, LoginRequest, Token
from dependencies import get_db
from repositories.auth_repository import AuthRepository
from repositories.shopping_cart_repository import ShoppingCartRepository

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/sign-up", status_code=status.HTTP_201_CREATED)
async def create_user(
    create_user_request: CreateUserRequest,
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
    cart_repo: ShoppingCartRepository = Depends(ShoppingCartRepository),
):
    """
    Creates a new user.
    """

    user = await auth_repo.create_user(db, create_user_request)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
        )

    """ Create corresponding shopping cart """
    try:
        shopping_cart = await cart_repo.create_shopping_cart(db, user)
    except HTTPException:
        pass

    user = await auth_repo.login(
        db,
        LoginRequest(
            username=create_user_request.username, password=create_user_request.password
        ),
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    return user


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
):
    """
    Logs in a user.
    """
    user = await auth_repo.login(
        db, LoginRequest(username=form_data.username, password=form_data.password)
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    return user


@router.get("")
async def get_current_user(
    current_user: UserBase = Depends(AuthRepository.get_current_user),
):
    """"""
    return {
        "user_id": current_user.user_id,
        "email": current_user.email,
        "username": current_user.username,
        "name": current_user.name,
        "access_token": current_user.access_token,
    }


@router.delete("/logout")
async def logout(
    current_user: UserBase = Depends(AuthRepository.get_current_user),
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
):
    """
    Logs out a user.
    """
    await auth_repo.logout(db, current_user)
    return {"message": "Logged out successfully"}


@router.patch("/reset-password")
async def reset_password(
    email: str,
    new_password: str,
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
):
    """
    Resets a user's password.
    """
    return await auth_repo.reset_password(db, email, new_password)
