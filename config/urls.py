from django.conf import settings
from django.urls import include, path, re_path, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_auth.registration.views import VerifyEmailView
from .routers import urlpatterns as api_urlpatterns


urlpatterns = [
    re_path(r"^$", RedirectView.as_view(
        url=reverse_lazy("api-root"),
        permanent=False)
    ),
    path("api/v1/auth/", include("rest_auth.urls")),
    path("api/v1/auth/registration/", include("rest_auth.registration.urls")),
    path("api/v1/", include(api_urlpatterns)),
    path(settings.ADMIN_URL, admin.site.urls),
    re_path(
        r"^account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent"
    ),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        VerifyEmailView.as_view(),
        name="account_confirm_email"
    )
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
