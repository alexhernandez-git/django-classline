"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .views import users as user_views
from .views import promotion_codes as promotion_codes_views
from .views import created_costumers as created_costumers_views
from .views import commercials as commercials_views

router = DefaultRouter()
router.register(r'users', user_views.UserViewSet, basename='users')
router.register(r'promotion-code',
                promotion_codes_views.PromotionCodeViewSet, basename='promotion-code')
router.register(r'created-costumers',
                created_costumers_views.CreatedCostumerViewSet, basename='created-costumers')
router.register(r'commercials',
                commercials_views.CommercialViewSet, basename='commercials')
urlpatterns = [
    path('', include(router.urls))
]
