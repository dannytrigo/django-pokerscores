# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from os.path import dirname, basename, join as mkpath
from django.contrib.staticfiles.finders import find

def angular_home(request):
    index_file = find('index.html')
    print(index_file)
    with open(mkpath(dirname(dirname(dirname(__file__))), 'pokerui', 'build', 'ang', 'index.html'), 'rb') as index_file:
        data = index_file.read()
        return HttpResponse(data)
    return HttpResponse(status=500)
