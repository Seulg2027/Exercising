from django.shortcuts import redirect, render
from django.contrib import auth # 장고의 auth 기능을 사용하여 자동으로
from django.contrib.auth.models import User # 이미 내장된 유저 모델 사용

def login(request):
  # post 요청이 들어오면 로그인 처리
  if request.method == 'POST':
    userid = request.POST['username']
    pw = request.POST['password']
    user = auth.authenticate(request, username=userid, password=pw)
    if user is not None: # 유저가 있다면 로그인
      auth.login(request, user)
      return redirect('home')
    else: # 유저가 없다면 다시,,,
      return render(request, 'login.html')
  # get 요청이 들어오면 login form을 담고 있는 login.html을 띄워주는 역할
  else:
    return render(request, 'login.html')

def logout(request):
  auth.logout(request)
  return redirect('home')