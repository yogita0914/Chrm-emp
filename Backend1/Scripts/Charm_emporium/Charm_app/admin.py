from django.contrib import admin


# Register your models here.
from .models import *
from .models import Stock

from .models import (
    Supplier, 
    PurchaseBill, 
    PurchaseItem,
    PurchaseBillDetails, 
    SaleBill, 
    SaleItem,
    SaleBillDetails
)

admin.site.register(Supplier)
admin.site.register(PurchaseBill)
admin.site.register(PurchaseItem)
admin.site.register(PurchaseBillDetails)
admin.site.register(SaleBill)
admin.site.register(SaleItem)
admin.site.register(SaleBillDetails)

admin.site.register(Stock)

admin.site.register(PasswordReset)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)