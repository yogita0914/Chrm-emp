from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone
from django.urls import reverse
from .models import *
from .forms import *
from django.contrib import messages
from .models import Product, Wishlist
from django_filters.views import FilterView
from django.views.generic import TemplateView
from django.views.generic import (
    View, 
    ListView,
    CreateView,
    UpdateView,
    DeleteView
)
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import (
    PurchaseBill, 
    Supplier, 
    PurchaseItem,
    PurchaseBillDetails,
    SaleBill,  
    SaleItem,
    SaleBillDetails,
    Stock
)
from .forms import (
    SelectSupplierForm, 
    PurchaseItemFormset,
    PurchaseDetailsForm, 
    SupplierForm, 
    SaleForm,
    SaleItemFormset,
    SaleDetailsForm,
    st
)

# shows a lists of all suppliers
class SupplierListView(ListView):
    model = Supplier
    template_name = "suppliers/suppliers_list.html"
    queryset = Supplier.objects.filter(is_deleted=False)
    paginate_by = 10


# used to add a new supplier
class SupplierCreateView(SuccessMessageMixin, CreateView):
    model = Supplier
    form_class = SupplierForm
    success_url = '/transactions/suppliers'
    success_message = "Supplier has been created successfully"
    template_name = "suppliers/edit_supplier.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'New Supplier'
        context["savebtn"] = 'Add Supplier'
        return context     


# used to update a supplier's info
class SupplierUpdateView(SuccessMessageMixin, UpdateView):
    model = Supplier
    form_class = SupplierForm
    success_url = '/transactions/suppliers'
    success_message = "Supplier details has been updated successfully"
    template_name = "suppliers/edit_supplier.html"
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = 'Edit Supplier'
        context["savebtn"] = 'Save Changes'
        context["delbtn"] = 'Delete Supplier'
        return context


# used to delete a supplier
class SupplierDeleteView(View):
    template_name = "suppliers/delete_supplier.html"
    success_message = "Supplier has been deleted successfully"

    def get(self, request, pk):
        supplier = get_object_or_404(Supplier, pk=pk)
        return render(request, self.template_name, {'object' : supplier})

    def post(self, request, pk):  
        supplier = get_object_or_404(Supplier, pk=pk)
        supplier.is_deleted = True
        supplier.save()                                               
        messages.success(request, self.success_message)
        return redirect('suppliers-list')


# used to view a supplier's profile
class SupplierView(View):
    def get(self, request, name):
        supplierobj = get_object_or_404(Supplier, name=name)
        bill_list = PurchaseBill.objects.filter(supplier=supplierobj)
        page = request.GET.get('page', 1)
        paginator = Paginator(bill_list, 10)
        try:
            bills = paginator.page(page)
        except PageNotAnInteger:
            bills = paginator.page(1)
        except EmptyPage:
            bills = paginator.page(paginator.num_pages)
        context = {
            'supplier'  : supplierobj,
            'bills'     : bills
        }
        return render(request, 'suppliers/supplier.html', context)




# shows the list of bills of all purchases 
class PurchaseView(ListView):
    model = PurchaseBill
    template_name = "purchases/purchases_list.html"
    context_object_name = 'bills'
    ordering = ['-time']
    paginate_by = 10


# used to select the supplier
class SelectSupplierView(View):
    form_class = SelectSupplierForm
    template_name = 'purchases/select_supplier.html'

    def get(self, request, *args, **kwargs):                                    # loads the form page
        form = self.form_class
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):                                   # gets selected supplier and redirects to 'PurchaseCreateView' class
        form = self.form_class(request.POST)
        if form.is_valid():
            supplierid = request.POST.get("supplier")
            supplier = get_object_or_404(Supplier, id=supplierid)
            return redirect('new-purchase', supplier.pk)
        return render(request, self.template_name, {'form': form})


# used to generate a bill object and save items
class PurchaseCreateView(View):                                                 
    template_name = 'purchases/new_purchase.html'

    def get(self, request, pk):
        formset = PurchaseItemFormset(request.GET or None)                      # renders an empty formset
        supplierobj = get_object_or_404(Supplier, pk=pk)                        # gets the supplier object
        context = {
            'formset'   : formset,
            'supplier'  : supplierobj,
        }                                                                       # sends the supplier and formset as context
        return render(request, self.template_name, context)

    def post(self, request, pk):
        formset = PurchaseItemFormset(request.POST)                             # recieves a post method for the formset
        supplierobj = get_object_or_404(Supplier, pk=pk)                        # gets the supplier object
        if formset.is_valid():
            # saves bill
            billobj = PurchaseBill(supplier=supplierobj)                        # a new object of class 'PurchaseBill' is created with supplier field set to 'supplierobj'
            billobj.save()                                                      # saves object into the db
            # create bill details object
            billdetailsobj = PurchaseBillDetails(billno=billobj)
            billdetailsobj.save()
            for form in formset:                                                # for loop to save each individual form as its own object
                # false saves the item and links bill to the item
                billitem = form.save(commit=False)
                billitem.billno = billobj                                       # links the bill object to the items
                # gets the stock item
                stock = get_object_or_404(Stock, name=billitem.stock.name)       # gets the item
                # calculates the total price
                billitem.totalprice = billitem.perprice * billitem.quantity
                # updates quantity in stock db
                stock.quantity += billitem.quantity                              # updates quantity
                # saves bill item and stock
                stock.save()
                billitem.save()
            messages.success(request, "Purchased items have been registered successfully")
            return redirect('purchase-bill', billno=billobj.billno)
        formset = PurchaseItemFormset(request.GET or None)
        context = {
            'formset'   : formset,
            'supplier'  : supplierobj
        }
        return render(request, self.template_name, context)


# used to delete a bill object
class PurchaseDeleteView(SuccessMessageMixin, DeleteView):
    model = PurchaseBill
    template_name = "purchases/delete_purchase.html"
    success_url = '/transactions/purchases'
    
    def delete(self, *args, **kwargs):
        self.object = self.get_object()
        items = PurchaseItem.objects.filter(billno=self.object.billno)
        for item in items:
            stock = get_object_or_404(Stock, name=item.stock.name)
            if stock.is_deleted == False:
                stock.quantity -= item.quantity
                stock.save()
        messages.success(self.request, "Purchase bill has been deleted successfully")
        return super(PurchaseDeleteView, self).delete(*args, **kwargs)




# shows the list of bills of all sales 
class SaleView(ListView):
    model = SaleBill
    template_name = "sales/sales_list.html"
    context_object_name = 'bills'
    ordering = ['-time']
    paginate_by = 10


# used to generate a bill object and save items
class SaleCreateView(View):                                                      
    template_name = 'sales/new_sale.html'

    def get(self, request):
        form = SaleForm(request.GET or None)
        formset = SaleItemFormset(request.GET or None)                          # renders an empty formset
        stocks = Stock.objects.filter(is_deleted=False)
        context = {
            'form'      : form,
            'formset'   : formset,
            'stocks'    : stocks
        }
        return render(request, self.template_name, context)

    def post(self, request):
        form = SaleForm(request.POST)
        formset = SaleItemFormset(request.POST)                                 # recieves a post method for the formset
        if form.is_valid() and formset.is_valid():
            # saves bill
            billobj = form.save(commit=False)
            billobj.save()     
            # create bill details object
            billdetailsobj = SaleBillDetails(billno=billobj)
            billdetailsobj.save()
            for form in formset:                                                # for loop to save each individual form as its own object
                # false saves the item and links bill to the item
                billitem = form.save(commit=False)
                billitem.billno = billobj                                       # links the bill object to the items
                # gets the stock item
                stock = get_object_or_404(Stock, name=billitem.stock.name)      
                # calculates the total price
                billitem.totalprice = billitem.perprice * billitem.quantity
                # updates quantity in stock db
                stock.quantity -= billitem.quantity   
                # saves bill item and stock
                stock.save()
                billitem.save()
            messages.success(request, "Sold items have been registered successfully")
            return redirect('sale-bill', billno=billobj.billno)
        form = SaleForm(request.GET or None)
        formset = SaleItemFormset(request.GET or None)
        context = {
            'form'      : form,
            'formset'   : formset,
        }
        return render(request, self.template_name, context)


# used to delete a bill object
class SaleDeleteView(SuccessMessageMixin, DeleteView):
    model = SaleBill
    template_name = "sales/delete_sale.html"
    success_url = '/transactions/sales'
    
    def delete(self, *args, **kwargs):
        self.object = self.get_object()
        items = SaleItem.objects.filter(billno=self.object.billno)
        for item in items:
            stock = get_object_or_404(Stock, name=item.stock.name)
            if stock.is_deleted == False:
                stock.quantity += item.quantity
                stock.save()
        messages.success(self.request, "Sale bill has been deleted successfully")
        return super(SaleDeleteView, self).delete(*args, **kwargs)




# used to display the purchase bill object
class PurchaseBillView(View):
    model = PurchaseBill
    template_name = "bill/purchase_bill.html"
    bill_base = "bill/bill_base.html"

    def get(self, request, billno):
        context = {
            'bill'          : PurchaseBill.objects.get(billno=billno),
            'items'         : PurchaseItem.objects.filter(billno=billno),
            'billdetails'   : PurchaseBillDetails.objects.get(billno=billno),
            'bill_base'     : self.bill_base,
        }
        return render(request, self.template_name, context)

    def post(self, request, billno):
        form = PurchaseDetailsForm(request.POST)
        if form.is_valid():
            billdetailsobj = PurchaseBillDetails.objects.get(billno=billno)
            
            billdetailsobj.eway = request.POST.get("eway")    
            billdetailsobj.veh = request.POST.get("veh")
            billdetailsobj.destination = request.POST.get("destination")
            billdetailsobj.po = request.POST.get("po")
            billdetailsobj.cgst = request.POST.get("cgst")
            billdetailsobj.sgst = request.POST.get("sgst")
            billdetailsobj.igst = request.POST.get("igst")
            billdetailsobj.cess = request.POST.get("cess")
            billdetailsobj.tcs = request.POST.get("tcs")
            billdetailsobj.total = request.POST.get("total")

            billdetailsobj.save()
            messages.success(request, "Bill details have been modified successfully")
        context = {
            'bill'          : PurchaseBill.objects.get(billno=billno),
            'items'         : PurchaseItem.objects.filter(billno=billno),
            'billdetails'   : PurchaseBillDetails.objects.get(billno=billno),
            'bill_base'     : self.bill_base,
        }
        return render(request, self.template_name, context)


# used to display the sale bill object
class SaleBillView(View):
    model = SaleBill
    template_name = "bill/sale_bill.html"
    bill_base = "bill/bill_base.html"
    
    def get(self, request, billno):
        context = {
            'bill'          : SaleBill.objects.get(billno=billno),
            'items'         : SaleItem.objects.filter(billno=billno),
            'billdetails'   : SaleBillDetails.objects.get(billno=billno),
            'bill_base'     : self.bill_base,
        }
        return render(request, self.template_name, context)

    def post(self, request, billno):
        form = SaleDetailsForm(request.POST)
        if form.is_valid():
            billdetailsobj = SaleBillDetails.objects.get(billno=billno)
            
            billdetailsobj.eway = request.POST.get("eway")    
            billdetailsobj.veh = request.POST.get("veh")
            billdetailsobj.destination = request.POST.get("destination")
            billdetailsobj.po = request.POST.get("po")
            billdetailsobj.cgst = request.POST.get("cgst")
            billdetailsobj.sgst = request.POST.get("sgst")
            billdetailsobj.igst = request.POST.get("igst")
            billdetailsobj.cess = request.POST.get("cess")
            billdetailsobj.tcs = request.POST.get("tcs")
            billdetailsobj.total = request.POST.get("total")

            billdetailsobj.save()
            messages.success(request, "Bill details have been modified successfully")
        context = {
            'bill'          : SaleBill.objects.get(billno=billno),
            'items'         : SaleItem.objects.filter(billno=billno),
            'billdetails'   : SaleBillDetails.objects.get(billno=billno),
            'bill_base'     : self.bill_base,
        }
        return render(request, self.template_name, context)

# Create your views here.


@login_required
def Home(request):
    products = Product.objects.all()

    # Get filters from the request
    category = request.GET.get('category')  # e.g., 'shoes'
    brand = request.GET.get('brand')        # e.g., 'Nike'
    min_price = request.GET.get('min_price')  # Minimum price filter
    max_price = request.GET.get('max_price')  # Maximum price filter

    # Apply filters if provided
    if category:
        products = products.filter(category__category_type=category)

    if brand:
        products = products.filter(brand__name=brand)

    if category and brand:
        products = products.filter(category__category_type=category, brand__name=brand)

    if min_price:
        products = products.filter(p_price__gte=min_price)

    if max_price:
        products = products.filter(p_price__lte=max_price)

    # Fetch all categories and brands for filtering options
    categories = Category.objects.all()
    brands = Brand.objects.all()

    # Pass data to the template
    context = {
        'products': products,
        'categories': categories,
        'brands': brands,
    }
    return render(request, 'index.html', context)

def RegisterView(request):
    """User registration view."""
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Validate if username or email already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username is already taken.')
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email is already registered.')
            return redirect('register')

        # Create and save the new user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        messages.success(request, 'Registration successful! Please log in.')
        return redirect('login')

    return render(request, 'register.html')


def LoginView(request):
    """User login view."""
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid login credentials")
            return redirect('login')

    return render(request, 'login.html')

def LogoutView(request):

    logout(request)

    return redirect('login')

def ForgotPassword(request):
    """View to handle forgotten password scenarios."""
    if request.method == "POST":
        email = request.POST.get('email')

        try:
            user = User.objects.get(email=email)

            # Create a password reset object
            password_reset = PasswordReset.objects.create(user=user)

            # Generate the password reset link
            reset_url = reverse('reset-password', kwargs={'reset_id': password_reset.reset_id})
            full_reset_url = f"{request.scheme}://{request.get_host()}{reset_url}"

            # Email content
            email_body = f"Click the link to reset your password:\n\n{full_reset_url}"
            email_message = EmailMessage(
                'Password Reset Request',
                email_body,
                settings.EMAIL_HOST_USER,
                [email]
            )
            email_message.send(fail_silently=True)

            messages.success(request, 'Password reset email sent.')
            return redirect('password-reset-sent')

        except User.DoesNotExist:
            messages.error(request, 'No user found with this email.')
            return redirect('forgot-password')

    return render(request, 'forgot_password.html')

def ResetPassword(request, reset_id):
    """Handle password reset functionality."""
    try:
        password_reset = PasswordReset.objects.get(reset_id=reset_id)

        if request.method == "POST":
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')

            if password != confirm_password:
                messages.error(request, 'Passwords do not match.')
                return redirect('reset-password', reset_id=reset_id)

            if len(password) < 5:
                messages.error(request, 'Password must be at least 5 characters long.')
                return redirect('reset-password', reset_id=reset_id)

            # Update user password
            user = password_reset.user
            user.set_password(password)
            user.save()

            # Delete password reset entry
            password_reset.delete()

            messages.success(request, 'Password reset successfully. Please log in.')
            return redirect('login')

    except PasswordReset.DoesNotExist:
        messages.error(request, 'Invalid or expired reset link.')
        return redirect('forgot-password')

    return render(request, 'reset_password.html')

def PasswordResetSent(request, reset_id):
    """Display a message indicating that a password reset link has been sent."""
    if PasswordReset.objects.filter(reset_id=reset_id).exists():
        return render(request, 'password_reset_sent.html')
    else:
        messages.error(request, 'Invalid reset id')
        return redirect('forgot-password')

#------------------------------------Address Management
# View for creating a new address
@login_required
def create_address(request):
    if request.method == 'POST':
        form = AddressForm(request.POST)
        if form.is_valid():
            form.save()
            #  for popup this message line only
            messages.success(request, 'Address successfully created!')
            return redirect('view_addresses')
    else:
        form = AddressForm()
    return render(request, 'create_address.html', {'form': form})


# View for listing all addresses
def view_addresses(request):
    addresses = Address.objects.all()
    return render(request, 'view_addresses.html', {'addresses': addresses})

# View for updating an existing address
def update_address(request, pk):
    address = get_object_or_404(Address, pk=pk)
    if request.method == 'POST':
        form = AddressForm(request.POST, instance=address)
        if form.is_valid():
            form.save()
            # for popup this message line only
            messages.success(request, 'Address successfully updated!') 
            return redirect('view_addresses')
    else:
        form = AddressForm(instance=address)
    return render(request, 'update_address.html', {'form': form, 'address': address})

# Delete address view
def delete_address(request, pk):
    address = get_object_or_404(Address, pk=pk)
    if request.method == 'POST':
        address.delete()
        return redirect('view_addresses')
    return render(request, 'delete_address.html', {'address': address})



# --------------------------------product_list

@login_required
def add_to_cart(request, id):
    product = get_object_or_404(Product, id=id)
    cart,created = Cart.objects.get_or_create(user=request.user)
    cart_item,created = Cart_Item.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity +=1
        messages.info(request, f'Update quantity of {product.p_name} in your cart')
    else:
        messages.success(request, f'Added {product.p_name} to your cart')
    cart_item.save()
    referrer = request.META.get('HTTP_REFERER',None)
    if referrer:
        return redirect(referrer)
    else:
        return redirect('home')
    
@login_required
def cart_details(request):
    cart = Cart.objects.filter(user=request.user).first()
    cart_item = Cart_Item.objects.all()
    return render(request, 'cart_details.html', {'cart_item': cart_item})

def reduce_from_cart(request,id):
    cart_item = get_object_or_404(Cart_Item, id=id , cart__user=request.user)
    if cart_item.quantity >1:
        cart_item.quantity -=1
        cart_item.save()
        messages.info(request,f'Reduce quantity of {cart_item.product.p_name} in your')
    else:
        cart_item.delete()
        messages.warning(request,f'Removed {cart_item.product.p_name} from your Cart')
    return redirect('cart_details')

def remove_from_cart(request,id):
    cart_item = get_object_or_404(Cart_Item, id = id, cart__user=request.user)
    cart_item.delete()
    messages.warning(request,f'Removed {cart_item.product.p_name} from your Cart')
    return redirect('cart_details')


@login_required
def add_update_comment_rating(request, pk):
    # Retrieve the product based on the primary key
    product = get_object_or_404(Product, pk=pk)
    
    # Get all comments and ratings for the product
    comment_rating = product.comment_ratings.all()
    
    # Handle POST request (form submission)
    if request.method == 'POST':
        form = add_comment_and_rating_form(request.POST)
        if form.is_valid():
            # Save the comment and rating for the logged-in user
            comment_rating_instance, created = Comment_rating.objects.update_or_create(
                user=request.user,
                product=product,
                defaults={
                    'comment': form.cleaned_data['comment'],
                    'rating': form.cleaned_data['rating']
                }
            )

            # Render the page with the updated information
            return render(request, 'product_details.html', {
                'form': form,
                'product': product,
                'comment_rating': comment_rating,
            })
    
    else:
        form = add_comment_and_rating_form()

    # Render the page initially or after form submission
    return render(request, 'product_details.html', {
        'form': form,
        'product': product,
        'comment_rating': comment_rating,
    })



@login_required
def remove_comment_rating(request,pk):
    product = get_object_or_404(Product, pk=pk)
    comment_rating = get_object_or_404(Comment_rating, user = request.user , product=product)
    comment_rating.delete()
    return redirect('product_detail',pk=product.pk)

def product_details(request, pk):
    products = get_object_or_404(Product, pk=pk)
    comments_ratings = Comment_rating.objects.filter(product=products)
    form = add_comment_and_rating_form()
    return render(request, 'product_details.html', {
        'product':products,
        'comment_rating':comments_ratings,
        'form':form})
    

# .............search code..................
def Search(request):
    if request.method == "POST":
        srch = request.POST.get('srch', '').strip()
        if srch:
            pl = Product.objects.filter(p_name__icontains=srch)  # Case-insensitive search
        else:
            pl = Product.objects.all()  # Show all products if search is empty
    else:
        pl = Product.objects.all()
    
    context = {'products': pl}  # Use 'products' to match the template
    return render(request, 'index.html', context)

# View to add a product to the wishlist
def add_to_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)

    if created:
        messages.success(request, f'{product.p_name} has been added to your wishlist.')
    else:
        messages.info(request, f'{product.p_name} is already in your wishlist.')

    return redirect('wishlist')

# View to remove a product from the wishlist
def remove_from_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    Wishlist.objects.filter(user=request.user, product=product).delete()
    messages.success(request, f'{product.p_name} has been removed from your wishlist.')
    return redirect('wishlist')

# View to display wishlist
def wishlist(request):
    wishlist_items = Wishlist.objects.filter(user=request.user)
    return render(request, 'wishlist.html', {'wishlist_items': wishlist_items})

class StockListView(FilterView):
    filterset_class = StockFilter
    queryset = Stock.objects.filter(is_deleted=False)
    template_name = 'inventory.html'
    paginate_by = 10


class StockCreateView(SuccessMessageMixin, CreateView):                                 # createview class to add new stock, mixin used 
    model = Stock                                                                       # setting 'Stock' model as model
    form_class = StockForm                                                              # setting 'StockForm' form as form
    template_name = "edit_stock.html"                                                   # 'edit_stock.html' used as the template
    success_url = '/inventory'                                                          # redirects to 'inventory' page in the url 
    success_message = "Stock has been created successfully"                             # displays message when form is submitted

    def get_context_data(self, **kwargs):                                               # used to send additional context
        context = super().get_context_data(**kwargs)
        context["title"] = 'New Stock'
        context["savebtn"] = 'Add to Inventory'
        return context       


class StockUpdateView(SuccessMessageMixin, UpdateView):                                 # updateview class to edit stock, mixin used to 
    model = Stock                                                                       # setting 'Stock' model as model
    form_class = StockForm                                                              # setting 'StockForm' form as form
    template_name = "edit_stock.html"                                                   # 'edit_stock.html' used as the template
    success_url = '/inventory'                                                          # redirects to 'inventory' page in the url 
    success_message = "Stock has been updated successfully"                             # displays message when form is submitted

    def get_context_data(self, **kwargs):                                               # used to send additional context
        context = super().get_context_data(**kwargs)
        context["title"] = 'Edit Stock'
        context["savebtn"] = 'Update Stock'
        context["delbtn"] = 'Delete Stock'
        return context


class StockDeleteView(View):                                                            # view class to delete stock
    template_name = "delete_stock.html"                                                 # 'delete_stock.html' used as the template
    success_message = "Stock has been deleted successfully"                             # displays message when form is submitted
    
    def get(self, request, pk):
        stock = get_object_or_404(Stock, pk=pk)
        return render(request, self.template_name, {'object' : stock})

    def post(self, request, pk):  
        stock = get_object_or_404(Stock, pk=pk)
        stock.is_deleted = True
        stock.save()                                               
        messages.success(request, self.success_message)
        return redirect('inventory')
class HomeView(View):
    template_name = "home.html"
    def get(self, request):        
        labels = []
        data = []        
        stockqueryset = Stock.objects.filter(is_deleted=False).order_by('-quantity')
        for item in stockqueryset:
            labels.append(item.name)
            data.append(item.quantity)
        sales = SaleBill.objects.order_by('-time')[:3]
        purchases = PurchaseBill.objects.order_by('-time')[:3]
        context = {
            'labels'    : labels,
            'data'      : data,
            'sales'     : sales,
            'purchases' : purchases
        }
        return render(request, self.template_name, context)

class AboutView(TemplateView):
    template_name = "about.html"