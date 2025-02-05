from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.contrib.auth.models import User
import uuid

class PasswordReset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reset_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_when = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Password reset for {self.user.username} at {self.created_when}"

#----------------------------------------------------------Address management
class Address(models.Model):
    name = models.CharField(max_length=100)
    locality = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    state = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=10)

    def __str__(self):
        return self.name
    
# -----------------------------------------------------------------------------
# product and category model

from django.db import models
from django.contrib.auth.models import User
from autoslug import AutoSlugField
from django.db.models import Avg

from autoslug import AutoSlugField

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('shoes', 'Shoes'),
        ('bags', 'Bags'),
        ('tops', 'Tops'),
        ('dresses', 'Dresses'),
        ('skirts', 'Skirts'),
        ('jeans', 'Jeans'),
        ('accessories', 'Accessories'),
        ('jackets', 'Jackets'),
        ('activewear', 'Activewear'),
        ('underwear', 'Underwear'),
        ('lipstick', 'Lipstick')
        # Add more categories as needed
    ]
    c_name = models.CharField(max_length=100)  # Category name (e.g., Shoes, Bags, Tops)
    category_type = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='shoes')  # Predefined choices for girls' fashion
    slug = AutoSlugField(populate_from='c_name', null=True, unique=True)  # Automatically generates slug from category name

    def __str__(self):
        return self.c_name

    class Meta:
        db_table = 'category'

class Brand(models.Model):
    name = models.CharField(max_length=100)  # e.g., Nike, Puma, Adidas, H&M
    slug = AutoSlugField(populate_from='name', null=True, unique=True)  # Automatically generates slug from brand name

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'brand'


class Product(models.Model):
    img = models.ImageField(upload_to='products/', default='')
    p_name = models.CharField(max_length=50)  # Product name 
    p_price = models.IntegerField()  # Product price
    p_description = models.TextField(max_length=200)  # Product description
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # ForeignKey to Category
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True)   # ForeignKey to Brand
    slug = AutoSlugField(populate_from='get_slug', null=True, default=True)  # Slug to generate URL

    def get_slug(self):
        # Generate slug based on category, brand, and product name
        return f"{self.category.slug}-{self.brand.slug}-{self.p_name.lower().replace(' ', '-')}"

    def __str__(self):
        return self.p_name

    def averageRating(self):
        rating = Comment_rating.objects.filter(product=self).aggregate(Avg('rating'))
        avg = 0
        if rating['rating__avg'] is not None:  
            avg = round(float(rating['rating__avg']), 1)  # Round to 1 decimal place
        return avg
 

    class Meta:
        db_table = 'product'



class Cart(models.Model):  # cart for User
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Cart_Item(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.product.p_name

class Comment_rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comment_ratings')
    comment = models.TextField(null=True, blank=True)
    rating = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.comment and self.rating:
            return f"{self.user.username} - {self.product.p_name} - {self.rating}★ - {self.comment[:20]}"
        if self.comment:
            return f'{self.user.username} - {self.product.p_name} - {self.comment[:20]}'
        if self.rating:
            return f'{self.user.username} - {self.product.p_name} -{self.rating}★'
        
class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlisted_products')
    added_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.username} - {self.product.p_name}"

class Stock(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    quantity = models.IntegerField(default=1)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
class Supplier(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=12, unique=True)
    address = models.CharField(max_length=200)
    email = models.EmailField(max_length=254, unique=True)
    gstin = models.CharField(max_length=15, unique=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name


#contains the purchase bills made
class PurchaseBill(models.Model):
    billno = models.AutoField(primary_key=True)
    time = models.DateTimeField(auto_now=True)
    supplier = models.ForeignKey(Supplier, on_delete = models.CASCADE, related_name='purchasesupplier')

    def __str__(self):
        return "Bill no: " + str(self.billno)
    
    
    def get_items_list(self):
        return PurchaseItem.objects.filter(billno=self)

    def get_total_price(self):
        purchaseitems = PurchaseItem.objects.filter(billno=self)
        total = 0
        for item in purchaseitems:
            total += item.totalprice
        return total

#contains the purchase stocks made
class PurchaseItem(models.Model):
    billno = models.ForeignKey(PurchaseBill, on_delete = models.CASCADE, related_name='purchasebillno')
    stock = models.ForeignKey(Stock, on_delete = models.CASCADE, related_name='purchaseitem')
    quantity = models.IntegerField(default=1)
    perprice = models.IntegerField(default=1)
    totalprice = models.IntegerField(default=1)

    def __str__(self):
        return "Bill no: " + str(self.billno.billno) + ", Item = " + self.stock.name

#contains the other details in the purchases bill
class PurchaseBillDetails(models.Model):
    billno = models.ForeignKey(PurchaseBill, on_delete = models.CASCADE, related_name='purchasedetailsbillno')
    
    eway = models.CharField(max_length=50, blank=True, null=True)    
    veh = models.CharField(max_length=50, blank=True, null=True)
    destination = models.CharField(max_length=50, blank=True, null=True)
    po = models.CharField(max_length=50, blank=True, null=True)
    
    cgst = models.CharField(max_length=50, blank=True, null=True)
    sgst = models.CharField(max_length=50, blank=True, null=True)
    igst = models.CharField(max_length=50, blank=True, null=True)
    cess = models.CharField(max_length=50, blank=True, null=True)
    tcs = models.CharField(max_length=50, blank=True, null=True)
    total = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return "Bill no: " + str(self.billno.billno)


#contains the sale bills made
class SaleBill(models.Model):
    billno = models.AutoField(primary_key=True)
    time = models.DateTimeField(auto_now=True)

    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=12)
    address = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    gstin = models.CharField(max_length=15)

    def __str__(self):
        return "Bill no: " + str(self.billno)
    
    def get_items_list(self):
        return SaleItem.objects.filter(billno=self)
        
    def get_total_price(self):
        saleitems = SaleItem.objects.filter(billno=self)
        total = 0
        for item in saleitems:
            total += item.totalprice
        return total

#contains the sale stocks made
class SaleItem(models.Model):
    billno = models.ForeignKey(SaleBill, on_delete = models.CASCADE, related_name='salebillno')
    stock = models.ForeignKey(Stock, on_delete = models.CASCADE, related_name='saleitem')
    quantity = models.IntegerField(default=1)
    perprice = models.IntegerField(default=1)
    totalprice = models.IntegerField(default=1)

    def __str__(self):
        return "Bill no: " + str(self.billno.billno) + ", Item = " + self.stock.name

#contains the other details in the sales bill
class SaleBillDetails(models.Model):
    billno = models.ForeignKey(SaleBill, on_delete = models.CASCADE, related_name='saledetailsbillno')
    
    eway = models.CharField(max_length=50, blank=True, null=True)    
    veh = models.CharField(max_length=50, blank=True, null=True)
    destination = models.CharField(max_length=50, blank=True, null=True)
    po = models.CharField(max_length=50, blank=True, null=True)
    
    cgst = models.CharField(max_length=50, blank=True, null=True)
    sgst = models.CharField(max_length=50, blank=True, null=True)
    igst = models.CharField(max_length=50, blank=True, null=True)
    cess = models.CharField(max_length=50, blank=True, null=True)
    tcs = models.CharField(max_length=50, blank=True, null=True)
    total = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return "Bill no: " + str(self.billno.billno)