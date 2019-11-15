"""pokerscores URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin
from django.contrib.auth.models import User
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers, serializers, viewsets

from graphene_django.views import GraphQLView
from django.contrib.auth.views import auth_logout

from api.models import League, Profile
from api.views import UserViewSet, GroupViewSet, LeagueViewSet, ProfileViewSet, EventViewSet, GameViewSet, GamePlayerViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'leagues', LeagueViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'events', EventViewSet)
router.register(r'games', GameViewSet)
router.register(r'gameplayers', GamePlayerViewSet)

urlpatterns = [
    path('', include('social_django.urls', namespace='social')),
    # url(r'^', include(router.urls)),
    url(r'^views/', include('api.urls')),
    url(r'^api/', include(router.urls)),
    url(r'^api-doc/', include('rest_framework.urls')),
    url(r'^admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    url(r'^.*', TemplateView.as_view(template_name='home.html'), name='home')
]#'+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)