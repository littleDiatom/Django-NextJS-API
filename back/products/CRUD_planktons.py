from django.db import models
from products.models import Planktonslibrary
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction



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
    return Response({"request":"Success"})

## READ
def getAllPlanktons(request):
    productsList = Planktonslibrary.objects.all()

    serializedData : dict(int,str)={}
    i=0
    for product in productsList:
        serializedData[i] = {
            'id':product.id,
            'name': product.name, 
            'description': product.description,
            'picture': product.picture,
            'localisation': product.localisation,
            'water_temp':product.product_water_temp,
            'bloom_period':product.product_bloom,
            'created_at':product.product_created
        } 
        i+=1
        
    return serializedData


def getAnyPlanktons(request,product_id):

    product = get_object_or_404(Planktonslibrary, pk=product_id)

    result = {
        'id':product.id,
        'name': product.name, 
        'description': product.description,
        'picture': product.picture,
        'localisation': product.localisation,
        'water_temp':product.product_water_temp,
        'bloom_period':product.product_bloom,
        'created_at':product.product_created
    } 

    return result



## UPDATE
def updatePlanktons(request,product_id):
    outdatedProduct=getAnyPlanktons(request, product_id)

    with transaction.atomic():
        product = Planktonslibrary.objects.select_for_update().get(id=product_id)

        product.name = request.POST.get("name")
        product.description = request.POST.get("description")
        product.localisation = request.POST.get("localisation")
        product.product_water_temp = request.POST.get("water_temp")
        product.bloom_period = request.POST.get("bloom_period")
        product.created_at = request.POST.get("created_at")
        product.save()

    updatedProduct=getAnyPlanktons(request, product_id)

    result= {
        "old product":outdatedProduct,
        "updated product":updatedProduct,
    }

    return result



## DELETE
def deletePlanktons(request,product_id):
    oldProduct=getAnyPlanktons(request, product_id)

    with transaction.atomic():
        product = Planktonslibrary.objects.get(pk=product_id)
        product.delete()

    result={"message":f"The plankton has been deleted."}
    return result