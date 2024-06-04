from django.contrib.auth import logout
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from shop.serializers import CustomTokenObtainPairSerializer
from rest_framework import status
from .serializers import RegisterSerializer

from .models import CustomUser

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    
class HelloView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request):
        print("hello")
        return Response({"message": "hello world"})
    

class RegisterView(APIView):
    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(request.data['password'])
                user.save()
                user = authenticate(email=user.email, password=request.data['password'])
                if user:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "message": "A user has been created."
                    }, status=status.HTTP_201_CREATED)
                else:
                    print("User authentication failed")
                    return Response({"message": "Authentication failed after registration."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Exception occurred:", e)
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterAdminView(APIView):
    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(request.data['password'])
                user.is_admin="True"
                user.admin="True"
                user.is_superuser="True"
                user.is_staff="True"
                user.save()
                user = authenticate(email=user.email, password=request.data['password'])
                if user:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "message": "A user has been created."
                    }, status=status.HTTP_201_CREATED)
                else:
                    print("User authentication failed")
                    return Response({"message": "Authentication failed after registration."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                print("Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Exception occurred:", e)
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token) 
            })
        else:
            return Response({"error": "Invalid credentials"}, status=400)

    def get(self,request):
        try:
            logout(request)
            return Response({"message":"Logged out successfully."})
        except:
            return Response({"Error":"Unable to log-out."})



