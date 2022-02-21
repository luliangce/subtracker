from ninja import Field
from pydantic.generics import GenericModel
from typing import Any, Generic, Optional, TypeVar, Union

T = TypeVar("T")


class R(GenericModel, Generic[T]):
    code: int = Field(200, description="返回码")
    msg: str = Field("成功")
    data: Optional[T] = None
