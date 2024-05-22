from django.contrib.auth.hashers import check_password
from users.models import CustomUser


def authenticate(email=None, password=None):
    try:
        user = CustomUser.objects.get(email=email)
        if check_password(password, user.password):
            return user
        return None
    except CustomUser.DoesNotExist:
        return None