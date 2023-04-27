from django.http import FileResponse

from .settings import BASE_DIR

def getRu(request):
    if request.method == 'GET':
        f = open(BASE_DIR / 'img/ru.png', 'rb')
        return FileResponse(f)

def getEn(request):
    if request.method == 'GET':
        f = open(BASE_DIR / 'img/en.png', 'rb')
        return FileResponse(f)