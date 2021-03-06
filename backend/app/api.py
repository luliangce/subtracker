from typing import List, Optional

from common.auth import Auth
from common.schema import R
from django.http import HttpRequest
from ninja import NinjaAPI, Query

from app.models import SubscribeModel
from app.schema import (SubscribeCreationSchema, SubscribeSchema, UserSchema,
                        UserUpdateSchema)

api = NinjaAPI(title="main")
auth = Auth()


@api.get("/info", response=R[UserSchema], auth=auth)
def info(request: HttpRequest):
    return R(data=UserSchema.from_orm(request.user))


@api.patch("/info", response=R[UserSchema], auth=auth)
def update_info(request: HttpRequest, modifaction: UserUpdateSchema):
    user = request.user
    if modifaction.password and modifaction.prev_password:
        if user.check_password(modifaction.prev_password):
            user.set_password(modifaction.password)
    if modifaction.last_name is not None:
        user.last_name = modifaction.last_name
    if modifaction.first_name is not None:
        user.first_name = modifaction.first_name
    user.save()
    return R(data=UserSchema.from_orm(user))


@api.get("/subscribes", response=R[List[SubscribeSchema]], auth=auth)
def get_subscribes(request: HttpRequest,
                   ordering: Optional[str] = Query("-price")):

    return R(data=list(
        SubscribeModel.objects.filter(
            user=request.user).order_by(ordering or "-id")))


@api.post("/subscribes", response=R[SubscribeSchema], auth=auth)
def add_sub(request: HttpRequest, body: SubscribeCreationSchema):
    obj = SubscribeModel(user=request.user, **body.dict(exclude_none=True))
    obj.save()
    return R(data=SubscribeSchema.from_orm(obj))


@api.put("/subscribes/{sub_id}", response=R[SubscribeSchema], auth=auth)
def modify_sub(request: HttpRequest, sub_id: int,
               body: SubscribeCreationSchema):
    try:
        obj: SubscribeModel = SubscribeModel.objects.get(id=sub_id)
        SubscribeModel.objects.filter(id=sub_id).update(**body.dict())
    except SubscribeModel.DoesNotExist:
        return R(code=404, msg="Not Found")
    obj.refresh_from_db()
    return R(data=SubscribeSchema.from_orm(obj))


@api.delete("/subscribes/{sub_id}", response=R, auth=auth)
def delete_sub(request: HttpRequest, sub_id: int):
    SubscribeModel.objects.filter(id=sub_id).delete()
    return R()
