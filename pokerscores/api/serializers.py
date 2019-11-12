from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import League, Profile, Event, Game, GamePlayer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'url', 'name')


class ProfileSingleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('id')


class LeagueSingleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = League
        fields = ('id', 'name')


class LeagueSerializer(serializers.HyperlinkedModelSerializer):
    profile_set = ProfileSingleSerializer(many=True, read_only=True)

    class Meta:
        model = League
        fields = ('id', 'name', 'profile_set')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ('id', 'user',)


class EventSerializer(serializers.HyperlinkedModelSerializer):
    host = ProfileSerializer()

    class Meta:
        model = Event

        fields = ('id', 'date', 'host')


class GameSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'event', 'number', 'stake')


class GamePlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GamePlayer
        fields = ('id', 'position', 'rebuys')
