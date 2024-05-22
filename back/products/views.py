from django.http import JsonResponse
from products.CRUD_products import getAnyProducts, updateProduct,deleteProduct
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from users.token import get_tokens_for_user
from users.models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from products.models import Solutions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from django_nextjs.render import render_nextjs_page_sync

#CRUD PRODUITS
class ProductView(APIView):
    authentication_classes = [JWTAuthentication] 

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]
    

    def get(self,request):
        productsList = Solutions.objects.all()
        serializedData : dict(int,str)={}
        for product in productsList:
            serializedData[product.id] = {
                'name': product.name, 
                'description': product.description,
                'picture': product.picture,
                'price': product.price
            } 
            
        return Response(serializedData,status=status.HTTP_200_OK)
        
    def post(self,request):
        product_name = request.data.get("name")
        product_description = request.data.get("description")
        product_picture = request.data.get("picture")
        product_price = request.data.get("price")
        ProductToDb = Solutions(name=product_name,description=product_description,picture=product_picture,price=product_price)
        ProductToDb.save()
        return Response({"request":"Success"},status=status.HTTP_200_OK)

class ProductIDView(APIView):
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]

    def get(self,request,product_id):
        product = getAnyProducts(request,product_id)
        return Response(product, status=status.HTTP_200_OK)
    
    def put(self,request,product_id):
        result = updateProduct(request,product_id)
        return Response(result, status=status.HTTP_200_OK)
        
    def delete(self,request,product_id):
        result = deleteProduct(request,product_id)
        return Response(result, status=status.HTTP_200_OK)



def index(request):
    return render_nextjs_page_sync(request)