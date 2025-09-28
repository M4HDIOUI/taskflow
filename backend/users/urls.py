from django.urls import path
from .views import register, login, current_user, google_login

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("user/", current_user, name="current_user"),
    path("google/", google_login, name="google_login"),  # NEW
]
