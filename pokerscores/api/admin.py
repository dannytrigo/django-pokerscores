# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin

# Register your models here.

from .models import League, Profile, Event, EventChatMessage, EventPlayer, Game, GamePlayer

admin.site.register(League)
admin.site.register(Profile)
admin.site.register(Event)
admin.site.register(EventChatMessage)
admin.site.register(EventPlayer)
admin.site.register(Game)
admin.site.register(GamePlayer)
