import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import popularVideosReducer from "./popularVideosReducer";
import popularPlaylistsReducer from "./popularPlaylistsReducer";
import popularPodcastsReducer from "./popularPodcastsReducer";
import recomendedVideosReducer from "./recomendedVideosReducer";
import videoReducer from "./videoReducer";
import videosReducer from "./videosReducer";
import playlistsReducer from "./playlistsReducer";
import playlistsAdminReducer from "./playlistsAdminReducer";
import playlistReducer from "./playlistReducer";
import playlistAdminReducer from "./playlistAdminReducer";
import podcastsReducer from "./podcastsReducer";
import meetupsReducer from "./meetupsReducer";
import studentsReducer from "./studentsReducer";
import accountsReducer from "./accountsReducer";
import pricingReducer from "./pricingReducer";
import authCommercialsReducer from "./authCommercialsReducer";
import costumersReducer from "./costumersReducer";
import commercialsReducer from "./commercialsReducer";
import paymentsReducer from "./paymentsReducer";
import foldersReducer from "./foldersReducer";
import filesReducer from "./filesReducer";
import shareStudentsReducer from "./shareStudentsReducer";
import publicFilesReducer from "./publicFilesReducer";
import publicFoldersReducer from "./publicFoldersReducer";
import sharedFilesReducer from "./sharedFilesReducer";
import sharedFoldersReducer from "./sharedFoldersReducer";
import moveFoldersReducer from "./moveFoldersReducer";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import commentsReducer from "./commentsReducer";
import instructorAccountsReducer from "./instructorAccountsReducer";
import bookEventsReducer from "./bookEventsReducer";
import packsReducer from "./packs/packsReducer";
import packReducer from "./packs/packReducer";
import videosPackAdminReducer from "./packs/videosPackAdminReducer";
import podcastsPackAdminReducer from "./packs/podcastsPackAdminReducer";
import buyPacksReducer from "./packs/buyPacksReducer";
import studentPackReducer from "./packs/studentPackReducer";
import videosPackReducer from "./packs/videosPackReducer";
import podcastsPackReducer from "./packs/podcastsPackReducer";
import topicsReducer from "./topics/topicsReducer";
import topicReducer from "./topics/topicReducer";
import videosTopicReducer from "./topics/videosTopicReducer";
import playlistsTopicReducer from "./topics/playlistsTopicReducer";
import podcastsTopicReducer from "./topics/podcastsTopicReducer";
import meetupStudentsReducer from "./meetupStudentsReducer";
import coursesReducer from "./courses/coursesReducer";
import courseReducer from "./courses/courseReducer";
import blocksReducer from "./courses/blocksReducer";
import blockReducer from "./courses/blockReducer";
import itemsReducer from "./courses/itemsReducer";
import playingCourseReducer from "./courses/playingCourseReducer";
import questionsReducer from "./courses/questionsReducer";
import answersReducer from "./courses/answersReducer";
import buyCoursesReducer from "./courses/buyCoursesReducer";
import courseStudentsReducer from "./courses/courseStudentsReducer";

export default combineReducers({
  authReducer,
  programReducer,
  popularVideosReducer,
  popularPlaylistsReducer,
  popularPodcastsReducer,
  recomendedVideosReducer,
  videoReducer,
  videosReducer,
  playlistsAdminReducer,
  playlistsReducer,
  playlistAdminReducer,
  playlistReducer,
  podcastsReducer,
  meetupsReducer,
  pricingReducer,
  accountsReducer,
  studentsReducer,
  foldersReducer,
  filesReducer,
  publicFoldersReducer,
  publicFilesReducer,
  sharedFoldersReducer,
  sharedFilesReducer,
  shareStudentsReducer,
  moveFoldersReducer,
  postsReducer,
  postReducer,
  commentsReducer,
  instructorAccountsReducer,
  bookEventsReducer,
  packsReducer,
  packReducer,
  videosPackAdminReducer,
  podcastsPackAdminReducer,
  buyPacksReducer,
  studentPackReducer,
  videosPackReducer,
  podcastsPackReducer,
  topicsReducer,
  topicReducer,
  videosTopicReducer,
  playlistsTopicReducer,
  podcastsTopicReducer,
  meetupStudentsReducer,
  coursesReducer,
  courseReducer,
  blocksReducer,
  blockReducer,
  itemsReducer,
  playingCourseReducer,
  questionsReducer,
  answersReducer,
  buyCoursesReducer,
  courseStudentsReducer,

  
  // Commercials reducers
  authCommercialsReducer,
  costumersReducer,
  commercialsReducer,
  paymentsReducer,
});
