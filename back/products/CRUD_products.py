from products.models import Solutions
from rest_framework.response import Response
from django.db import transaction
from django.shortcuts import get_object_or_404

## CREATE
def createProducts(request):
    product_name = request.data.get("name")
    product_description = request.data.get("description")
    product_picture = request.data.get("picture")
    product_price = request.data.get("price")
    ProductToDb = Solutions(name=product_name,description=product_description,picture=product_picture,price=product_price)
    ProductToDb.save()
    return Response({"request":"Success"})


## READ
def getAllProducts(request):
    productsList = Solutions.objects.all()

    serializedData : dict(int,str)={}
    for product in productsList:
        serializedData[product.id] = {
            'name': product.name, 
            'description': product.description,
            'picture': product.picture,
            'price': product.price
        } 
        
    return Response(serializedData)


def getAnyProducts(request,product_id):

    product = get_object_or_404(Solutions, pk=product_id)

    result = {
        'name': product.name, 
        'description': product.description,
        'picture': product.picture,
        'price': product.price
    } 

    return result



## UPDATE
def updateProduct(request,product_id):
    outdatedProduct=getAnyProducts(request, product_id)

    with transaction.atomic():
        product = Solutions.objects.select_for_update().get(id=product_id)

        product.name = request.POST.get("name")
        product.description = request.POST.get("description")
        product.picture = request.POST.get("picture")
        product.price = request.POST.get("price")
        product.save()

    updatedProduct=getAnyProducts(request, product_id)

    result= {
        "old product":outdatedProduct,
        "updated product":updatedProduct,
    }

    return result



## DELETE
def deleteProduct(request,product_id):
    oldProduct=getAnyProducts(request, product_id)

    with transaction.atomic():
        product = Solutions.objects.get(pk=product_id)
        product.delete()

    result={"message":f"The product has been deleted."}
    return result