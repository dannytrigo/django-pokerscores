from django.conf.urls import url

from . import views
from rest_framework import routers

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/', views.login, name='login'),
    url(r'^logout/', views.logout, name='logout'),
    url(r'^avatar/(?P<profile_id>[0-9]+)/$', views.avatar, name='avatar'),
    url(r'^leagues/$', views.leagues_list, name='leagues_index'),
    url(r'^leagues/(?P<league_id>[0-9]+)/$', views.leagues_get, name='leagues_get'),
    url(r'^leagues/(?P<league_id>[0-9]+)/users/$', views.leagues_users_list,
        name='leagues_users_list'),
    url(r'^leagues/(?P<league_id>[0-9]+)/users/(?P<user_id>[0-9]+)/$',
        views.leagues_users_get, name='leagues_users_get'),
]

# urlpatterns = [
#     url(r'^$', views.index, name='index'),
# ]
