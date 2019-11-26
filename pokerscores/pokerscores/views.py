# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.contrib.staticfiles.finders import find


def angular_home(request):
    index_file = find('ang/index.html')
    if index_file:
        with open(index_file, 'rb') as index_file:
            data = index_file.read()
            return HttpResponse(data)
    return HttpResponse(status=500)
