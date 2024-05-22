"""
URL configuration for shop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from products.views import ProductView, ProductIDView, index
from products.CRUD_planktons import createPlanktons
from users.views import RegisterView,LoginView,CustomTokenObtainPairView,HelloView
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from users.CRUD_users import UsersView, UserIdView

urlpatterns = [
    path('hello/',HelloView.as_view(),name='hello_world'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('login/',LoginView.as_view(), name='login'), 
    path('register/',RegisterView.as_view(), name='register'), 
    path('products/',ProductView.as_view(), name='all_products'),
    path('products/<int:product_id>',ProductIDView.as_view(), name='single_product'),
    path('users/', UsersView.as_view(), name="users_list"),
    path('users/<int:user_id>', UserIdView.as_view(), name="single_user"),
]
