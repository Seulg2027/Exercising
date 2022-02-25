import json
from django.shortcuts import render
import requests
from .forms import SearchForm

my_id = '344010bdb08465cccc429771908599c8'

def home(request):
  if request.method == "POST":
    # 검색이 들어왔다면 실행
    form = SearchForm(request.POST)
    searchword = request.POST.get('search')
    if form.is_valid():
      url = 'https://api.themoviedb.org/3/search/movie?api_key=' + my_id + '&query=' + searchword
      response = requests.get(url)
      resdata = response.text
      obj = json.loads(resdata)
      obj = obj['results']
      return render(request, 'search.html', {'resdata': resdata, 'obj' : obj})
  else:
    form = SearchForm()
    url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=' + my_id
    response = requests.get(url)
    resdata = response.text
    obj = json.loads(resdata)
    obj = obj['results'] # 정보만 받는다.
  return render(request, 'home.html', { 'obj' : obj })


def detail(request, movie_id):
  # detail 페이지 api 사용
  url = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + my_id
  response = requests.get(url)
  resdata = response.text
  return render(request, 'movie_detail.html', {'resdata': resdata})