# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from os.path import dirname, basename, join as mkpath

def angular_home(request):
    with open(mkpath(dirname(dirname(__file__)), 'static', 'ang', 'index.html'), 'rb') as index_file:
        data = index_file.read()
        return HttpResponse(data)
    return HttpResponse(status=500)