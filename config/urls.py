
from django.conf import settings
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.contrib import admin
from frontend.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('api.users.urls', 'users'), namespace='users')),
    path('api/', include(('api.programs.urls', 'programs'), namespace='programs')),
    re_path(r'academy/.*', index, name='index'),
    re_path(r'^(?!media/)(?!api/)(?!academy/).*', include('frontend.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
