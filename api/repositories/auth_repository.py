from typing import Annotated, List
import os
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from pydantic import BaseModel
from datetime import timedelta, datetime
from dependencies import get_db
from dtos.user import CreateUserRequest, LoginRequest
from models.models import User
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("AUTH_SECRET")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")


class AuthRepository:

    async def create_user(self, db: Session, user: CreateUserRequest):
        try:
            create_user_model = User(
                email=user.email,
                username=user.username,
                password=bcrypt_context.hash(user.password),
                name=user.name,
            )
            db.add(create_user_model)
            db.commit()
            db.refresh(create_user_model)
            return create_user_model
        except:
            return

    def create_access_token(self, username: str, id: str, time: timedelta):
        expire = datetime.utcnow() + time
        to_encode = {"sub": username, "id": id, "exp": expire}
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    async def login(self, db: Session, user_dto: LoginRequest):
        """"""
        user = db.query(User).filter(User.username == user_dto.username).first()
        if not user:
            return False
        if not bcrypt_context.verify(user_dto.password, user.password):
            return False
        access_token = self.create_access_token(
            user.username, str(user.user_id), timedelta(minutes=30)
        )

        user.access_token = access_token
        db.commit()
        db.refresh(user)

        return {
            "user_id": user.user_id,
            "email": user.email,
            "username": user.username,
            "name": user.name,
            "access_token": access_token,
        }

    def get_current_user(
        self=None, token: str = Depends(oauth2_bearer), db: Session = Depends(get_db)
    ):
        """"""
        credential_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            token = token.replace("Bearer ", "")
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            user = db.query(User).filter(User.username == username).first()
            return False if user is None else user
        except JWTError as e:
            raise credential_exception from e
        except Exception as e:
            raise credential_exception from e

    async def logout(self, db: Session, user: User):
        user.access_token = None
        db.commit()
        return True
    

    async def reset_password(self, db: Session, email: str, new_password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="An error occurred"
            )
        user.password = bcrypt_context.hash(new_password)
        db.commit()
        db.refresh(user)
        return True