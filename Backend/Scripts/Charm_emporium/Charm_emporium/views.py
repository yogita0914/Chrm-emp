from django.http import HttpResponse

def welcome_View(request):
    return HttpResponse('Welcome to Project')

