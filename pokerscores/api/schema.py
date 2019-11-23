import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import League, Profile, User, Event, EventChatMessage, EventPlayer, Game, GamePlayer


class LeagueType(DjangoObjectType):
    class Meta:
        model = League


class ProfileType(DjangoObjectType):
    has_avatar = graphene.Boolean(source='has_avatar')

    class Meta:
        model = Profile
        exclude = ('avatar', )


class UserType(DjangoObjectType):
    class Meta:
        model = User


class EventType(DjangoObjectType):
    class Meta:
        model = Event


class EventChatMessageType(DjangoObjectType):
    class Meta:
        model = EventChatMessage


class EventPlayerType(DjangoObjectType):
    class Meta:
        model = EventPlayer


class GameType(DjangoObjectType):
    class Meta:
        model = Game


class GamePlayerType(DjangoObjectType):
    class Meta:
        model = GamePlayer


class Query(ObjectType):
    league = graphene.Field(LeagueType, id=graphene.Int())
    profile = graphene.Field(ProfileType, id=graphene.Int())
    user = graphene.Field(UserType, id=graphene.Int())
    event = graphene.Field(EventType, id=graphene.Int())
    eventplayer = graphene.Field(EventPlayerType, id=graphene.Int())
    game = graphene.Field(GameType, id=graphene.Int())
    gameplayer = graphene.Field(GamePlayerType, id=graphene.Int())

    leagues = graphene.List(LeagueType)
    profiles = graphene.List(ProfileType)
    users = graphene.List(UserType)
    events = graphene.List(EventType, league_id=graphene.Int(), first=graphene.Int())
    eventplayers = graphene.List(EventPlayerType, event_id=graphene.Int())
    games = graphene.List(GameType, event_id=graphene.Int(), first=graphene.Int())
    gameplayers = graphene.List(GamePlayerType, game_id=graphene.Int(), player_id=graphene.Int())

    def auth_check(func):
        def wrapper_auth(*args, **kwargs):
            print(*args)
            print(**kwargs)
            info = kwargs['info']
            if not info.context.user.is_authenticated:
                return None
            else:
                func(*args, **kwargs)
        return wrapper_auth


    def resolve_league(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return League.objects.get(pk=id)
        return None

    def resolve_profile(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Profile.objects.get(pk=id)
        return None

    def resolve_user(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return User.objects.get(pk=id)
        return None

    def resolve_event(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Event.objects.get(pk=id)
        return None

    def resolve_eventplayer(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return EventPlayer.objects.get(pk=id)

    def resolve_game(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Game.objects.get(pk=id)
        return None

    def resolve_gameplayer(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return GamePlayer.objects.get(pk=id)
        return None

    def resolve_leagues(self, info):
        return League.objects.all()

    def resolve_profiles(self, info):
        return Profile.objects.all()

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_events(self, info, league_id, first=None):
        print(info.context.user)
        print(info.context.user.is_authenticated)
        events = Event.objects.filter(league__id=league_id).order_by('-date')
        if first:
            events = events[:first]
        return events

    def resolve_eventplayers(self, info, event_id):
        eventplayers = EventPlayer.objects.filter(event__id=event_id)
        return eventplayers

    def resolve_games(self, info, event_id, first=None):
        games = Game.objects.filter(event__id=event_id)
        if first:
            games = games[:first]
        return games

    def resolve_gameplayers(self, info, game_id=None, player_id=None):
        if game_id:
            return GamePlayer.objects.filter(game__id=game_id)
        elif player_id:
            return GamePlayer.objects.filter(player__id=player_id)
        return None

class UpdateEventAttendance(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        eventId = graphene.Int(required=True)
        attendance = graphene.String(required=True)

    eventPlayer = graphene.Field(EventPlayerType)

    @staticmethod
    def mutate(root, info, eventId, attendance):
        if info.context.user.is_authenticated:
            event = Event.objects.get(id=eventId)
            try:
                ep = EventPlayer.objects.get(event=event, player=info.context.user.profile)
            except EventPlayer.DoesNotExist:
                ep = EventPlayer(event__id=event, player=info.context.user.profile)
            ep.attendance = attendance
            ep.save()
            return UpdateEventAttendance(eventPlayer=ep)

class Mutation(graphene.ObjectType):
    updateEventAttendance = UpdateEventAttendance.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
