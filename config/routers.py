from rest_framework import routers

from django_nustjs_rest_auth_example.users.views import UserViewSet


router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

urlpatterns = router.urls