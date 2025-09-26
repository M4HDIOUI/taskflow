from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        return Response({
            "access": data["access"],
            "refresh": data["refresh"]
        }, status=status.HTTP_200_OK)
