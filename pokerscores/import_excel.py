#!/usr/bin/env python
import os
from datetime import datetime
import sys

#if __name__ == "__main__":
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pokerscores.settings")
import django
django.setup()
from api.models import User, Profile, League, Event, Game, GamePlayer, EventPlayer

import pandas as pd

from pandas import ExcelFile

df = pd.read_excel('G:/Dropbox/Poker/Poker.xlsx', sheet_name='Placings Data')
print(df.columns[7:-3])

for player in df.columns[7:-3]:
    try:
        u = Profile.objects.get(nickname=player)
    except:
        print("Create profile %s" % player)
        u = User(username=player)
        u.save()
        p = Profile(nickname=player, user=u)
        p.save()

league = League.objects.all()[0]
i = 0
for game in df[df.columns[0]]:
    print(game)
    host = df[df.columns[5]][i]
    timestamp = df[df.columns[6]][i]
    date = timestamp.to_pydatetime()
    stake = df[df.columns[1]][i]
    first = df[df.columns[2]][i]
    second = df[df.columns[3]][i]
    third = df[df.columns[4]][i]
    print(host)

    if host:
        p = Profile.objects.get(nickname=host[:-1])
        try:
            e = Event.objects.get(host=p,date=date)
        except:
            print("No event")
            e = Event(league=league, host=p, date=date, status='F')
            e.save()
        g = None
        try:
            g = Game.objects.get(event=e, number=int(game))
        except:
            print("No game")
            try:
                g = Game(event=e, number=int(game), stake=stake)
                g.save()
            except:
                pass
        if g:
            j = 0
            for player in df.columns[7:-3]:
                placing = df[df.columns[7+j]][i]
                j = j + 1
                if placing in [0, 1, 2, 3]:
                    print(player, placing)
                    p = Profile.objects.get(nickname=player)
                    try:
                        pg = GamePlayer.objects.get(game=g, player=p)
                    except:
                        pg = GamePlayer(game=g, player=p)
                        pg.position = placing
                        if placing == 1:
                            pg.winnings = first
                        elif placing == 2:
                            pg.winnings = second
                        elif placing == 3:
                            pg.winnings = third
                        else:
                            pg.winnings = 0
                        pg.save()
                    try:
                        ep = EventPlayer.objects.get(event=e, player=p)
                    except Exception as ex:
                        print(str(ex))

                        ep = EventPlayer(event=e, player=p, attendance='AD')
                        ep.save()



    i = i + 1
