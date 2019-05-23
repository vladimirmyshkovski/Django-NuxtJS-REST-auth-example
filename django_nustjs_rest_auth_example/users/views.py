from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

from .models import User
from .serializers import UserSerializer


class UserViewSet(ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
