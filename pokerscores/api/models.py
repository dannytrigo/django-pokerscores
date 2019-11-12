# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from enum import Enum

class League(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name

# Note: this is really a "user", but since Django already provides a User
#       model we don't want to override it. Instead we want to create some
#       additional properties and link it to a user.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    leagues = models.ManyToManyField(League)
    nickname = models.TextField()

    def __str__(self):
        return str(self.user.username)

# automatically create/update profile when a User is created
#@receiver(post_save, sender=User)
#def create_user_profile(sender, instance, created, **kwargs):
#    if created:
#        Profile.objects.create(user=instance)
#

#@receiver(post_save, sender=User)
#def save_user_profile(sender, instance, **kwargs):
#    instance.profile.save()


class Event(models.Model):
    EventStatusChoices = [
        ('P', 'Proposed'),
        ('C', 'Confirmed'),
        ('X', 'Cancelled'),
        ('F', 'Finished'),
    ]

    league = models.ForeignKey(League, on_delete=models.CASCADE)
    host = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=2, choices=EventStatusChoices)

    def __str__(self):
        return str('%s : %s' % (str(self.date), str(self.host)))


class EventPlayer(models.Model):
    AttendanceChoices = [
        ('NA', "No response"),
        ('NI', "Not interested"),
        ('IN', "Interested"),
        ('AT', "Attending"),
        ('AD', 'Attended'),
        ('NS', 'No show'),
        ('CX', 'Cancelled'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    player = models.ForeignKey(Profile, on_delete=models.CASCADE)
    attendance = models.CharField(max_length=2, choices=AttendanceChoices)

    def __str__(self):
        return "(%s) %s" % (self.event, self.player.nickname)

class Game(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    number = models.IntegerField()
    stake = models.IntegerField()

    def __str__(self):
        return "%s (#%d)" % (str(self.event), self.number)


class GamePlayer(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Profile, on_delete=models.CASCADE)
    position = models.IntegerField(default=0)
    winnings = models.IntegerField(default=0)
    rebuys = models.IntegerField(default=0)

    def __str__(self):
        return "%d: %s" % (self.position, str(self.player))
