from django.http import QueryDict
from django.views.generic import View

class TestView(View):
    http_method_names = ['get', 'post', 'put', 'delete']

    def put(self, *args, **kwargs):
        print("Hello, i'm %s!" % self.request.method)

    def delete(self, *args, **kwargs):
        print("Hello, i'm %s!" % self.request.method)