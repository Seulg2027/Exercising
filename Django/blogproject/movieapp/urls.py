from django.urls import path
from movieapp import views

app_name='movieapp'
urlpatterns = [
    path('', views.home, name="home"),
    path('detail/<str:movie_id>', views.detail, name="detail"),
]
