from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from .models import Sport_object

import math
import pandas as pd
from datetime import datetime

def parseData():
    arr = pd.read_excel('./data-20160714T0856-structure-20160714T0856.xlsx')
    arr = arr.astype('string')
    arr.fillna('')

    for item in range(arr.shape[0]):
        print(item, 'out of', arr.shape[0])
        obj = Sport_object.objects.create()
        
        obj.name = {
            "ru": str(arr.iloc[item, 1]) if str(arr.iloc[item, 1]) != '<NA>' else '',
            "en": str(arr.iloc[item, 2]) if str(arr.iloc[item, 2]) != '<NA>' else ''
        }
        obj.active = True if str(arr.iloc[item, 3]) == 'Y' else False
        obj.short_info = {
            "ru": str(arr.iloc[item, 4]) if str(arr.iloc[item, 4]) != '<NA>' else '',
            "en": str(arr.iloc[item, 6]) if str(arr.iloc[item, 6]) != '<NA>' else ''
        }
        obj.detail_info = {
            "ru": str(arr.iloc[item, 5]) if str(arr.iloc[item, 5]) != '<NA>' else '',
            "en": str(arr.iloc[item, 7]) if str(arr.iloc[item, 7]) != '<NA>' else ''
        }
        obj.address = {
            "ru": str(arr.iloc[item, 13]) if str(arr.iloc[item, 13]) != '<NA>' else '',
            "en": str(arr.iloc[item, 14]) if str(arr.iloc[item, 14]) != '<NA>' else ''
        }
        obj.FCP = {
            "ru": str(arr.iloc[item, 16]) if str(arr.iloc[item, 16]) != '<NA>' else '',
            "en": str(arr.iloc[item, 16]) if str(arr.iloc[item, 16]) != '<NA>' else ''
        }
        obj.actions = {
            "ru": str(arr.iloc[item, 17]) if str(arr.iloc[item, 17]) != '<NA>' else '',
            "en": str(arr.iloc[item, 17]) if str(arr.iloc[item, 17]) != '<NA>' else ''
        }
        obj.start_date = datetime.strptime(arr.iloc[item, 18], '%d.%m.%Y') if str(arr.iloc[item, 18]) != '<NA>' else None
        obj.end_date = datetime.strptime(arr.iloc[item, 19], '%d.%m.%Y') if str(arr.iloc[item, 19]) != '<NA>' else None
        obj.finances = {
            'all': float(arr.iloc[item, 20]) if str(arr.iloc[item, 20]) != '<NA>' else 0,
            'f': float(arr.iloc[item, 21]) if str(arr.iloc[item, 21]) != '<NA>' else 0,
            's': float(arr.iloc[item, 22]) if str(arr.iloc[item, 22]) != '<NA>' else 0,
            'm': float(arr.iloc[item, 25]) if str(arr.iloc[item, 25]) != '<NA>' else 0,
            'p': float(arr.iloc[item, 27]) if str(arr.iloc[item, 27]) != '<NA>' else 0
        }

        obj.curator = {
            "ru": str(arr.iloc[item, 30]) if str(arr.iloc[item, 30]) != '<NA>' else '',
            "en": str(arr.iloc[item, 30]) if str(arr.iloc[item, 30]) != '<NA>' else ''
        }
        obj.curator_address = {
            "ru": str(arr.iloc[item, 32]) if str(arr.iloc[item, 32]) != '<NA>' else '',
            "en": str(arr.iloc[item, 33]) if str(arr.iloc[item, 33]) != '<NA>' else ''
        }
        obj.curator_phone = str(arr.iloc[item, 34]) if str(arr.iloc[item, 34]) != '<NA>' else ''

        obj.object_phone = str(arr.iloc[item, 35]) if str(arr.iloc[item, 35]) != '<NA>' else ''
        obj.working_regime = str(arr.iloc[item, 36]) if str(arr.iloc[item, 36]) != '<NA>' else ''
        obj.working_regime_sat = str(arr.iloc[item, 37]) if str(arr.iloc[item, 37]) != '<NA>' else ''
        obj.working_regime_sun = str(arr.iloc[item, 38]) if str(arr.iloc[item, 38]) != '<NA>' else ''
        obj.email = str(arr.iloc[item, 40]) if str(arr.iloc[item, 40]) != '<NA>' else ''
        obj.object_type = {
            "ru": str(arr.iloc[item, 43]) if str(arr.iloc[item, 43]) != '<NA>' else '',
            "en": str(arr.iloc[item, 43]) if str(arr.iloc[item, 43]) != '<NA>' else ''
        }
        obj.object_sports = {
            "ru": str(arr.iloc[item, 45]) if str(arr.iloc[item, 45]) != '<NA>' else '',
            "en": str(arr.iloc[item, 45]) if str(arr.iloc[item, 45]) != '<NA>' else ''
        }
        obj.ymap = {
            'x': float(arr.iloc[item, 46]),
            'y': float(arr.iloc[item, 47])
        }

        obj.save()

def main(request):
    if request.method == 'GET':
        return render(request, 'Objects/index.html')
    return HttpResponse(status=400)

def get_graph_data(request):
    if request.method == 'GET':
        arr = sorted(list(Sport_object.objects.all()), key = lambda x: math.sqrt((x.ymap['x'] - 37.617698)**2 + (x.ymap['y'] - 55.755864)**2))
        return JsonResponse({
            'data': [i.finances['all'] for i in arr if i.finances['all'] > 0],
            'min': math.floor(math.sqrt((arr[0].ymap['x'] - 37.617698)**2 + (arr[0].ymap['y'] - 55.755864)**2)) * 62.5,
            'max': math.floor(math.sqrt((arr[-1].ymap['x'] - 37.617698)**2 + (arr[-1].ymap['y'] - 55.755864)**2)) * 62.5
        })
    return HttpResponse(status=400)

def get_markers(request):
    if request.method == 'GET':
        return JsonResponse({'markers': [{'id': i.pk, 'ymap': i.ymap} for i in list(Sport_object.objects.all())]})
    return HttpResponse(status=400)

def get_search(request):
    if request.method == 'GET':
        q = request.GET.get('q', None)
        pos = request.GET.get('pos', None)

        pos = int(pos)
        q = str(q).lower()

        if q != None and pos != None:
            for obj in list(Sport_object.objects.all()):
                if str(obj.name['ru']).lower().find(q) != -1 or str(obj.name['en']).lower().find(q) != -1:
                    if pos == 0:
                        return JsonResponse({
                            'id': obj.pk,
                            'name': obj.name,
                            'active': {'ru': 'Да', 'en': 'Yes'} if obj.active else {'ru': 'Нет', 'en': 'No'},
                            'short_info': obj.short_info,
                            'detail_info': obj.detail_info,
                            'address': obj.address,
                            'FCP': obj.FCP,
                            'actions': obj.actions,
                            'start_date': datetime.strftime(obj.start_date, '%d.%m.%Y') if obj.start_date != None else '',
                            'end_date': datetime.strftime(obj.end_date, '%d.%m.%Y') if obj.end_date != None else '',
                            'finances': obj.finances,
                            'curator': obj.curator,
                            'curator_address': obj.curator_address,
                            'curator_phone': obj.curator_phone,
                            'object_phone': obj.object_phone,
                            'working_regime': obj.working_regime,
                            'working_regime_sat': obj.working_regime_sat,
                            'working_regime_sun': obj.working_regime_sun,
                            'email': obj.email,
                            'object_type': obj.object_type,
                            'object_sports': obj.object_sports,
                            'ymap': obj.ymap
                        })
                    pos -= 1
        return HttpResponse(status=404)
    return HttpResponse(status=400)

def get_object(request):
    if request.method == 'GET':
        id = request.GET.get('id', None)

        if id != None:
            id = int(id)
            obj = list(Sport_object.objects.filter(pk = id))

            if len(obj) > 0:
                obj = obj[0]

                return JsonResponse({
                    'id': obj.pk,
                    'name': obj.name,
                    'active': {'ru': 'Да', 'en': 'Yes'} if obj.active else {'ru': 'Нет', 'en': 'No'},
                    'short_info': obj.short_info,
                    'detail_info': obj.detail_info,
                    'address': obj.address,
                    'FCP': obj.FCP,
                    'actions': obj.actions,
                    'start_date': datetime.strftime(obj.start_date, '%d.%m.%Y') if obj.start_date != None else '',
                    'end_date': datetime.strftime(obj.end_date, '%d.%m.%Y') if obj.end_date != None else '',
                    'finances': obj.finances,
                    'curator': obj.curator,
                    'curator_address': obj.curator_address,
                    'curator_phone': obj.curator_phone,
                    'object_phone': obj.object_phone,
                    'working_regime': obj.working_regime,
                    'working_regime_sat': obj.working_regime_sat,
                    'working_regime_sun': obj.working_regime_sun,
                    'email': obj.email,
                    'object_type': obj.object_type,
                    'object_sports': obj.object_sports,
                    'ymap': obj.ymap
                })
    return HttpResponse(status=400)

def get_short_info(request):
    if request.method == 'GET':
        active = 0
        built = 0
        renovated = 0
        finances = 0
        for i in list(Sport_object.objects.all()):
            if i.active:
                active += 1
            if i.actions['ru'] == 'строительство':
                built += 1
            else:
                renovated += 1
            finances += i.finances['all']
        
        return JsonResponse({
            'active': active,
            'built': built,
            'renovated': renovated,
            'finances': finances
        })
    return HttpResponse(status=400)