from django.http import JsonResponse
from django.db import models
from products.models import Planktonslibrary

def createPlanktons(request):
    product_name = request.POST.get("name")
    product_description = request.POST.get("description")
    product_picture = request.POST.get("picture")
    product_localisation = request.POST.get("localisation")
    product_water_temp = request.POST.get("water_temp")
    product_bloom = request.POST.get("bloom_period")
    product_created = models.DateTimeField(auto_now_add=True)
    ProductToDb = Planktonslibrary(name=product_name,description=product_description,picture=product_picture,localisation=product_localisation,water_temperature = product_water_temp,bloom_period = product_bloom)
    ProductToDb.save()
    return JsonResponse(request.POST) 