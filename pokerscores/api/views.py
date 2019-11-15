# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User, Group
from django.contrib.auth.views import auth_logout
from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from rest_framework import viewsets

from .serializers import UserSerializer, GroupSerializer, LeagueSerializer, ProfileSerializer, EventSerializer, \
    GameSerializer, GamePlayerSerializer
from .models import League, Profile, Event, Game, GamePlayer

import jwt, json
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return HttpResponse('<p>Hello, world. You''re at the API index.</p><a href="{% url "social:begin" "google-oauth2" %}">Google+</a>')

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect('/')

@csrf_exempt
def login(request):
    print('login!')
    if request.method == 'GET':
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            return HttpResponse(json.dumps({'authenticated': True,
                                            'username': request.user.username,
                                            'nickname': profile.nickname,
                                            'profileId': profile.id,
                                            'is_superuser': request.user.is_superuser,
                                            }),
                                content_type='application/json')
        else:
            return HttpResponse(json.dumps({'authenticated': False}), content_type='application/json', status=401)
    if request.method == 'POST':
        try:
            username = request.POST['username']
            password = request.POST['password']
            print(username)
            print(password)
            user = User.objects.get(username=username)
            valid = user.check_password(password)
            if not valid:
                raise Exception('Invalid password')
        except:
            return HttpResponse(json.dumps({'Error': "Invalid username/password"}),
                                status=400,
                                content_type="application/json"
                                )
        if user:
            payload = {
                'id': user.id,
                'username': user.username,
                #'nickname':
                'email': user.email,
            }
            j = jwt.encode(payload, "SECRET_KEY", algorithm='HS256')
            print(j)
            jwt_token = {'token': j.decode('utf-8')}
            print(payload)
            print(jwt_token)

            return HttpResponse(
                json.dumps(jwt_token),
                status=200,
                content_type="application/json"
            )
        else:
            return HttpResponse(json.dumps({'Error': "Invalid username/password"}),
                                status=400,
                                content_type="application/json"
                                )


def leagues_list(request):
    leagues = League.objects.order_by('-id')
    output = serializers.serialize("json", leagues)
    return HttpResponse(output)
    # return HttpResponse("You're looking at all leagues.")


def leagues_get(request, league_id):
    league = League.objects.get(id=league_id)
    output = serializers.serialize("json", league)
    return HttpResponse(output)
    # return HttpResponse("You're looking at league %s." % league_id)


def leagues_users_list(request, league_id):
    return HttpResponse("You're looking at league %s, all users." % league_id)


def leagues_users_get(request, league_id, user_id):
    return HttpResponse("You're looking at league %s, user %s." % (league_id, user_id))


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class LeagueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leagues to be viewed or edited.
    """
    queryset = League.objects.all()
    serializer_class = LeagueSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows profiles to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GamePlayerViewSet(viewsets.ModelViewSet):
    queryset = GamePlayer.objects.all()
    serializer_class = GamePlayerSerializer
