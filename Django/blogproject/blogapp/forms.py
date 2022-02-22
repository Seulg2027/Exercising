from django import forms
from .models import Blog, Comment

class BlogForm(forms.Form):
  # 내가 입력받고자 하는 값들
  title = forms.CharField()
  body = forms.CharField(widget=forms.Textarea)

# form 자체가 Blog 모델을 기반으로 만들어졌기 때문에 더 쉽게 views.py 설계 가능
class BlogModelForm(forms.ModelForm):
  class Meta:
    model = Blog
    fields = '__all__' # 어떤 필드를 입력받을지 작성
    # fields = ['title', 'body']

class CommentForm(forms.ModelForm):
  class Meta:
    model = Comment
    fields = ['comment']