from django.http import JsonResponse
from products.CRUD_planktons import getAnyPlanktons, updatePlanktons,deletePlanktons
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from users.token import get_tokens_for_user
from users.models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from products.models import Planktonslibrary
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from django_nextjs.render import render_nextjs_page_sync
from django.db import models


#CRUD PLANKTONS
class PlanktonView(APIView):
    authentication_classes = [JWTAuthentication] 

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]
    

    def get(self,request):
        productsList = Planktonslibrary.objects.all()
        serializedData : dict(int,str)={}
        i=0
        for product in productsList:
            serializedData[i] = {
                'id':product.id,
                'name': product.name, 
                'description': product.description,
                'picture': product.picture,
                'localisation': product.localisation
            } 
            i+=1
            
        return Response(serializedData,status=status.HTTP_200_OK)
        
    def post(self,request):
        product_name = request.data.get("name")
        product_description = request.data.get("description")
        product_picture = request.data.get("picture")
        product_localisation = request.data.get("localisation")
        product_created = models.DateTimeField(auto_now_add=True)
        
        if not all([product_name,product_description]):
            return Response({"error": "Le nom et la description sont obligatoires."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:    
            ProductToDb = Planktonslibrary(name=product_name,description=product_description,picture=product_picture,localisation=product_localisation)
            ProductToDb.save()
            return Response({"request":"Success"},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PlanktonIDView(APIView):
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]

    def get(self,request,plankton_id):
        product = getAnyPlanktons(request,plankton_id)
        return Response(product, status=status.HTTP_200_OK)
    
    def put(self,request,plankton_id):
        result = updatePlanktons(request,plankton_id)
        return Response(result, status=status.HTTP_200_OK)
        
    def delete(self,request,plankton_id):
        result = deletePlanktons(request,plankton_id)
        return Response(result, status=status.HTTP_200_OK)



def index(request):
    return render_nextjs_page_sync(request)