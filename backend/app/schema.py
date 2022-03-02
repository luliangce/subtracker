from typing import Optional
from ninja import Field, ModelSchema
from .models import SubscribeModel
from django.contrib.auth.models import User
from pydantic.config import BaseConfig


class SubscribeSchema(ModelSchema):

    name: str = Field(..., min_length=1, max_length=16, description="订阅名称")

    class Config(BaseConfig):
        model = SubscribeModel
        model_exclude = ["user"]


class SubscribeCreationSchema(ModelSchema):

    class Config:
        model = SubscribeModel
        model_fields = [
            "name",
            "begin",
            "end",
            "auto_renew",
            "renew_period",
            "price",
        ]


class UserSchema(ModelSchema):

    class Config:
        model = User
        model_fields = [
            "id",
            "username",
            "date_joined",
            "last_name",
            "first_name",
        ]


class UserCreationSchema(ModelSchema):

    class Config:
        model = User
        model_fields = ["username", "last_name", "first_name"]

    password: str = Field(..., description="密码", min_length=8, max_length=64)


class UserUpdateSchema(ModelSchema):

    class Config:
        model = User
        model_fields = ["last_name", "first_name"]

    prev_password: Optional[str] = Field(None,
                                         description="原密码",
                                         min_length=8,
                                         max_length=64)
    password: Optional[str] = Field(None,
                                    description="新密码",
                                    min_length=8,
                                    max_length=64)
