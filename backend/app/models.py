from decimal import Decimal
from django.db import models

from django.contrib.auth.models import User


class _BaseModel(models.Model):

    class Meta:
        abstract = True

    ct = models.DateTimeField(auto_now_add=True)
    mt = models.DateTimeField(auto_now=True)


class SubscribeModel(_BaseModel):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=32, help_text="名称")
    begin = models.DateField(null=True)
    end = models.DateField(null=True)
    auto_renew = models.BooleanField(default=False)
    renew_period = models.IntegerField(default=30, verbose_name="续约周期")
    price = models.DecimalField(default="0",
                                verbose_name="价格",
                                max_digits=10,
                                decimal_places=2)

    @property
    def price_per_day(self) -> Decimal:
        return self.price / self.renew_period
