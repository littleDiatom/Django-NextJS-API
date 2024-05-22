import datetime
from users.models import CustomUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.shortcuts import get_object_or_404
from .serializers import serializedUser
from django.db import transaction
from rest_framework_simplejwt.tokens import OutstandingToken
from rest_framework.permissions import BasePermission


class IsUserIdOrAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        user_id_from_url = view.kwargs.get('user_id')
        return request.user.id == user_id_from_url or request.user.is_admin


#CRUD PRODUITS
class UsersView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTAuthentication]    
    
    def get(self,request):
        users = CustomUser.objects.all()
        serializedData : dict(int,str)={}
        for user in users:
            serializedData.update(serializedUser(user))
            
        return Response(serializedData,status=status.HTTP_200_OK)


class UserIdView(APIView):
    authentication_classes = [JWTAuthentication]    
    permission_classes= [IsUserIdOrAdmin]
    
    def get(self,request,user_id):
        user = get_object_or_404(CustomUser, pk=user_id)
        serializedData = serializedUser(user)
            
        return Response(serializedData,status=status.HTTP_200_OK)

    def put(self,request,user_id):
        oldUser = get_object_or_404(CustomUser, pk=user_id)
        old_serializedUser = serializedUser(oldUser)

        with transaction.atomic():
            user = CustomUser.objects.select_for_update().get(id=user_id)
            user.first_name = request.data.get("first_name")
            user.last_name = request.data.get("last_name")
            user.last_login = request.data.get("last_login")
            user.email = request.data.get("email")
            user.address = request.data.get("address")
            user.zip_code = request.data.get("zip_code")
            user.city = request.data.get("city")
            user.phone = request.data.get("phone")
            user.save()

            updatedUser=get_object_or_404(CustomUser, pk=user_id)
            new_serializedUser = serializedUser(updatedUser)

        result= {
            "old user info":old_serializedUser,
            "updated user info":new_serializedUser,
        }
        
        return Response(result,status=status.HTTP_200_OK)


    def delete(self,request,user_id):
        oldUser = get_object_or_404(CustomUser, pk=user_id)
        old_serializedUser = serializedUser(oldUser)

        with transaction.atomic():
            user = CustomUser.objects.get(pk=user_id)
            OutstandingToken.delete(user)
            user.is_active = False
            user.save()

        result={"message":f"The user has been deleted successfully and disconnected."}

        return Response(result,status=status.HTTP_200_OK)
