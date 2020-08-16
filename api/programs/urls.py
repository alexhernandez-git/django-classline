"""Users URLs."""

# Django
from django.urls import include, path

# Django REST Framework
from rest_framework.routers import DefaultRouter
from api.programs.views.programs import ProgramViewSet
from api.programs.views.videos import VideoViewSet
from api.programs.views.podcasts import PodcastViewSet
from api.programs.views.playlists import PlaylistViewSet
from api.programs.views.events import EventViewSet
from api.programs.views.students import StudentViewSet
from api.programs.views.accounts_created import AccountCreatedViewSet
from api.programs.views.ratings import RatingViewSet
router = DefaultRouter()
router.register(r'programs', ProgramViewSet, basename='program')
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/videos',
    VideoViewSet,
    basename='videos'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/podcasts',
    PodcastViewSet,
    basename='podcasts'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/playlists',
    PlaylistViewSet,
    basename='playlists'
)

router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/events',
    EventViewSet,
    basename='events'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/students',
    StudentViewSet,
    basename='students'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/accounts-created',
    AccountCreatedViewSet,
    basename='accounts-created'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/ratings',
    RatingViewSet,
    basename='ratings'
)
urlpatterns = [
    path('', include(router.urls))
]
