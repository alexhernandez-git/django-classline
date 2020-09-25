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
from api.programs.views.playlists_admin import PlaylistAdminViewSet
from api.programs.views.files import FileViewSet
from api.programs.views.folders import FolderViewSet
from api.programs.views.public_files import PublicFileViewSet
from api.programs.views.public_folders import PublicFolderViewSet
from api.programs.views.shared_files import SharedFileViewSet
from api.programs.views.shared_folders import SharedFolderViewSet

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
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses',
    PlaylistAdminViewSet,
    basename='courses'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/files',
    FileViewSet,
    basename='files'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/folders',
    FolderViewSet,
    basename='folders'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/public-files',
    PublicFileViewSet,
    basename='public-files'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/public-folders',
    PublicFolderViewSet,
    basename='public-folders'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/shared-files',
    SharedFileViewSet,
    basename='shared-files'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/shared-folders',
    SharedFolderViewSet,
    basename='shared-folders'
)
urlpatterns = [
    path('', include(router.urls))
]
