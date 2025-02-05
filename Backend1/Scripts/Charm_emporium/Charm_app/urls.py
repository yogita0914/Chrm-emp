
from django.contrib import admin
from django.urls import path
from . import views as v
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', v.Home, name='home'),
    path('index/', v.Home, name='index'),
    path('register/', v.RegisterView, name='register'),
    path('login/', v.LoginView, name='login'),
    path('logout/', v.LogoutView, name='logout'),
    path('forgot-password/', v.ForgotPassword, name='forgot-password'),
    path('password-reset-sent/<str:reset_id>/', v.PasswordResetSent, name='password-reset-sent'),
    path('reset-password/<str:reset_id>/', v.ResetPassword, name='reset-password'),
    path('create/', create_address, name='create_address'),
    path('addresses/', view_addresses, name='view_addresses'),
    path('update/<int:pk>/', update_address, name='update_address'),
    path('delete/<int:pk>/', delete_address, name='delete_address'),
    path('remove_from_cart/<int:id>', remove_from_cart, name='remove_from_cart'),
    path('cart_details/', cart_details, name='cart_details'),
    path('add_to_cart/<int:id>', add_to_cart, name='add_to_cart'),
    path('reduce_from_cart/<int:id>', reduce_from_cart, name='reduce_from_cart'),
    path('product_details/<int:pk>/', product_details , name='product_details'),
    path('add_update_comment_rating/<int:pk>', add_update_comment_rating, name='add_comment_rating'),
    path('search_product', v.Search, name='search_product'),
     path('wishlist/', views.wishlist, name='wishlist'),
    path('add_to_wishlist/<int:product_id>/', views.add_to_wishlist, name='add_to_wishlist'),
    path('remove_from_wishlist/<int:product_id>/', views.remove_from_wishlist, name='remove_from_wishlist'),
    path('', views.StockListView.as_view(), name='inventory'),
    path('new', views.StockCreateView.as_view(), name='new-stock'),
    path('stock/<pk>/edit', views.StockUpdateView.as_view(), name='edit-stock'),
    path('stock/<pk>/delete', views.StockDeleteView.as_view(), name='delete-stock'),
    path('', views.HomeView.as_view(), name='home'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('suppliers/', views.SupplierListView.as_view(), name='suppliers-list'),
    path('suppliers/new', views.SupplierCreateView.as_view(), name='new-supplier'),
    path('suppliers/<pk>/edit', views.SupplierUpdateView.as_view(), name='edit-supplier'),
    path('suppliers/<pk>/delete', views.SupplierDeleteView.as_view(), name='delete-supplier'),
    path('suppliers/<name>', views.SupplierView.as_view(), name='supplier'),

    path('purchases/', views.PurchaseView.as_view(), name='purchases-list'), 
    path('purchases/new', views.SelectSupplierView.as_view(), name='select-supplier'), 
    path('purchases/new/<pk>', views.PurchaseCreateView.as_view(), name='new-purchase'),    
    path('purchases/<pk>/delete', views.PurchaseDeleteView.as_view(), name='delete-purchase'),
    
    path('sales/', views.SaleView.as_view(), name='sales-list'),
    path('sales/new', views.SaleCreateView.as_view(), name='new-sale'),
    path('sales/<pk>/delete', views.SaleDeleteView.as_view(), name='delete-sale'),

    path("purchases/<billno>", views.PurchaseBillView.as_view(), name="purchase-bill"),
    path("sales/<billno>", views.SaleBillView.as_view(), name="sale-bill"),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)