from django.db import models

class Blog(models.Model):
  title = models.CharField(max_length=200) # 블로그 제목
  body = models.TextField()
  photo = models.ImageField(blank=True, null=True, upload_to='blog_photo')
  date = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.title

class Comment(models.Model):
  comment = models.CharField(max_length=200)
  date = models.DateField(auto_now_add=True)
  post = models.ForeignKey(Blog, on_delete=models.CASCADE) # 게시글이 삭제되면 => 그 댓글도 삭제해준다.
  
  def __str__(self):
      return self.comment