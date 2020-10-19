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
import coursesReducer from "./coursesReducer";
import playlistReducer from "./playlistReducer";
import courseReducer from "./courseReducer";
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
import packsReducer from "./packsReducer";
import packReducer from "./packReducer";
import videosPackReducer from "./videosPackReducer";
import podcastsPackReducer from "./podcastsPackReducer";
import buyPacksReducer from "./buyPacksReducer";

export default combineReducers({
  authReducer,
  programReducer,
  popularVideosReducer,
  popularPlaylistsReducer,
  popularPodcastsReducer,
  recomendedVideosReducer,
  videoReducer,
  videosReducer,
  coursesReducer,
  playlistsReducer,
  courseReducer,
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
  videosPackReducer,
  podcastsPackReducer,
  buyPacksReducer,
  
  // Commercials reducers
  authCommercialsReducer,
  costumersReducer,
  commercialsReducer,
  paymentsReducer,
});
