from .models import *
from  rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password']

        def create(self, validated_data):
            user = User.objects.create_user(
                username = validated_data['username'],
                email = validated_data['email'],
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],
                password = validated_data['password']
            )
            return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['c_name', 'category']

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['p_name','p_price','p_description','category', 'brand']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['name','local','city','mobile','state','zipcode']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['user','created_at']
        read_only_fields = ['created_at']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart_Item
        fields = ['cart', 'product', 'quantity']

class Comment_ratingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment_rating
        fields = ['user','product','comment','rating','created_at','updated_at']
        read_only_fields = ['created_at', 'updated_at']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['user','product', 'added_at']
        read_only_fields = ['added_at']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id','name','quantity','is_deleted']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id','name','phone','address','email','gstin','is_deleted']

class PurchaseBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseBill
        fields = ['billno', 'time','supplier']

class PurchaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseItem
        fields = ['billno','stock','quantity','perprice','totalprice']

class PurchaseBillDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseBillDetails
        fields = ['billno','eway','veh','destination','po','cgst','sgst','igst','cess','tcs','total']

class SalesBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleBill
        fields = ['billno','time','name','phone','address','email','gstin']

class SaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = ['billno', 'stock', 'quantity','perprice', 'totalprice']

class SaleBillDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleBillDetails
        fields = ['billno','eway','veh','destination','po', 'cgst','sgst','igst','cess','tcs','total']