from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User  # Import from our custom User model


@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": f"Registration failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Debug: Check if user exists
        try:
            user = User.objects.get(email=email)
            print(f"User found: {user.username}, {user.email}")
        except User.DoesNotExist:
            print(f"User not found for email: {email}")
            return Response({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED)

        # Since USERNAME_FIELD is 'email', we can authenticate directly with email
        user = authenticate(username=email, password=password)
        if not user:
            print(f"Authentication failed for email: {email}")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        print(f"Authentication successful for user: {user.username}")
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        })
    except Exception as e:
        print(f"Login error: {str(e)}")
        return Response({"error": f"Login failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })
