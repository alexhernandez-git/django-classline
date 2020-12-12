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
from api.programs.views.posts import PostViewSet
from api.programs.views.comments import CommentViewSet
from api.programs.views.instructors import InstructorViewSet
from api.programs.views.packs import PackViewSet
from api.programs.views.videos_pack import VideoPackViewSet
from api.programs.views.podcasts_pack import PodcastPackViewSet
from api.programs.views.program_topics import ProgramTopicViewSet
from api.programs.views.videos_topic import VideoTopicViewSet
from api.programs.views.playlists_topic import PlaylistTopicViewSet
from api.programs.views.podcasts_topic import PodcastTopicViewSet
from api.programs.views.event_students import EventStudentViewSet
from api.programs.views.courses.courses import CourseViewSet
from api.programs.views.courses.block_tracks import CourseBlockTrackViewSet
from api.programs.views.courses.blocks import CourseBlockViewSet
from api.programs.views.courses.item_tracks import CourseItemTrackViewSet
from api.programs.views.courses.items import CourseItemViewSet
from api.programs.views.courses.contents import LectureContentViewSet
from api.programs.views.courses.materials import LectureMaterialViewSet
from api.programs.views.courses.item_questions import ItemQuestionViewSet
from api.programs.views.courses.item_answers import ItemAnswerViewSet
from api.programs.views.courses.items_viewed import ItemViewedViewSet
from api.programs.views.courses.students import CourseStudentViewSet

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
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/events/(?P<event_id>[-a-zA-Z0-9_]+)/event-students',
    EventStudentViewSet,
    basename='event-student'
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
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/playlists-admin',
    PlaylistAdminViewSet,
    basename='playlists-admin'
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
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/posts',
    PostViewSet,
    basename='posts'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/posts/(?P<post_id>[-a-zA-Z0-9_]+)/users/(?P<user_id>[-a-zA-Z0-9_]+)/comments',
    CommentViewSet,
    basename='comments'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/posts/(?P<post_id>[-a-zA-Z0-9_]+)/comments',
    CommentViewSet,
    basename='comments'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/comments',
    CommentViewSet,
    basename='comments'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/instructors',
    InstructorViewSet,
    basename='instructors'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/packs',
    PackViewSet,
    basename='packs'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/packs/(?P<pack_id>[-a-zA-Z0-9_]+)/videos-pack',
    VideoPackViewSet,
    basename='videos-pack'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/packs/(?P<pack_id>[-a-zA-Z0-9_]+)/podcasts-pack',
    PodcastPackViewSet,
    basename='podcasts-pack'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/topics',
    ProgramTopicViewSet,
    basename='topics'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/topics/(?P<topic_id>[-a-zA-Z0-9_]+)/videos-topic',
    VideoTopicViewSet,
    basename='videos-topic'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/topics/(?P<topic_id>[-a-zA-Z0-9_]+)/playlists-topic',
    PlaylistTopicViewSet,
    basename='playlist-topic'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/topics/(?P<topic_id>[-a-zA-Z0-9_]+)/podcasts-topic',
    PodcastTopicViewSet,
    basename='podcasts-topic'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses',
    CourseViewSet,
    basename='courses'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/block-tracks',
    CourseBlockTrackViewSet,
    basename='block-tracks'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/blocks',
    CourseBlockViewSet,
    basename='blocks'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/blocks/(?P<block_id>[-a-zA-Z0-9_]+)/item-tracks',
    CourseItemTrackViewSet,
    basename='block-tracks'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/blocks/(?P<block_id>[-a-zA-Z0-9_]+)/items',
    CourseItemViewSet,
    basename='blocks'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/items/(?P<item_id>[-a-zA-Z0-9_]+)/contents',
    LectureContentViewSet,
    basename='contents'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/items/(?P<item_id>[-a-zA-Z0-9_]+)/materials',
    LectureMaterialViewSet,
    basename='materials'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/items/(?P<item_id>[-a-zA-Z0-9_]+)/questions',
    ItemQuestionViewSet,
    basename='questions'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/questions/(?P<question_id>[-a-zA-Z0-9_]+)/answers',
    ItemAnswerViewSet,
    basename='answers'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/items/(?P<item_id>[-a-zA-Z0-9_]+)/items-viewed',
    ItemViewedViewSet,
    basename='items-viewed'
)
router.register(
    r'programs/(?P<slug_id>[-a-zA-Z0-9_]+)/courses/(?P<course_id>[-a-zA-Z0-9_]+)/course-students',
    CourseStudentViewSet,
    basename='course-student'
)
urlpatterns = [
    path('', include(router.urls))
]
