from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_field_names(cls, declared_fields, info):
        field_names = super().get_field_names(declared_fields, info)
        if 'username' in field_names:
            field_names.remove('username')
        return field_names
