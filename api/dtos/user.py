from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    username: str
    email: str
    password: str
    name: str


class LoginRequest:
    username: str
    password: str

    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

class Token(BaseModel):
    access_token: str
    token_type: str
