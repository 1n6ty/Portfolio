from django.urls import path
from .views import main, get_graph_data, get_markers, get_object, get_search, get_short_info

urlpatterns = [
    path('', main),
    path('graph/', get_graph_data),
    path('markers/', get_markers),
    path('object/', get_object),
    path('search/', get_search),
    path('short/', get_short_info)
]
