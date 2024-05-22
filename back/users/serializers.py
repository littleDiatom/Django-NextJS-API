from rest_framework import serializers
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

def serializedUser(user):
    serializedData : dict(int,str)={}
    serializedData[user.id] = {
        'First name': user.first_name,
        'Last name': user.last_name, 
        'Last login':user.last_login,
        'email': user.email,
        'Adress':user.address,
        'Zip code':user.zip_code,
        'City':user.city,
        'Phone':user.phone
    } 
    return serializedData

