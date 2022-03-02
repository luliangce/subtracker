from django.db import models


class _BaseModel(models.Model):

    class Meta:
        abstract = True

    ct = models.DateTimeField(auto_now_add=True)
    mt = models.DateTimeField(auto_now=True)


class SubscribeModel(_BaseModel):
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=32, help_text="名称")
    begin = models.DateField()
    end = models.DateField()
    auto_renew = models.BooleanField(default=False)
    renew_period = models.IntegerField(default=30, verbose_name="续约周期")
    price = models.DecimalField(default="0",
                                verbose_name="价格",
                                max_digits=10,
                                decimal_places=2)

    cycle_begin = models.DateField(null=True)
    cycle_end = models.DateField(null=True)

    renew_price = models.DecimalField(null=True,
                                      default="0",
                                      verbose_name="自动续费价格",
                                      max_digits=10,
                                      decimal_places=2)
