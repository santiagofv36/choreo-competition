# from typing import Annotated
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette import status
from schemas.schemas import UserBase
from dtos.user import CreateUserRequest, LoginRequest, Token
from dependencies import get_db

from repositories.auth_repository import AuthRepository


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/sign-up", status_code=status.HTTP_201_CREATED)
async def create_user(
    create_user_request: CreateUserRequest,
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
):
    """
    Creates a new user.
    """

    user = await auth_repo.create_user(db, create_user_request)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
        )

    return user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
    auth_repo: AuthRepository = Depends(AuthRepository),
):
    """
    Logs in a user.
    """
    access_token = await auth_repo.login(
        db, LoginRequest(username=form_data.username, password=form_data.password)
    )

    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    return access_token


@router.get("")
async def get_current_user(
    current_user: UserBase = Depends(AuthRepository.get_current_user),
):
    """"""
    return current_user
