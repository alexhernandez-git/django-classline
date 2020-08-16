import {
  VIDEOS_FETCH,
  VIDEOS_SUCCESS,
  VIDEOS_FAIL,
  SET_VIDEO_EDIT,
  DELETE_VIDEO_EDIT,
  EDIT_VIDEO,
  EDIT_VIDEO_FAIL,
  EDIT_VIDEO_SUCCESS,
  CREATE_VIDEO,
  CREATE_VIDEO_FAIL,
  CREATE_VIDEO_SUCCESS,
  DELETE_VIDEO,
  DELETE_VIDEO_FAIL,
  DELETE_VIDEO_SUCCESS,
} from "../types";

const initialState = {
  isLoading: true,
  videos: null,
  error: null,
  video_edit: null,
  video_editing: false,
  video_edit_error: null,
  video_creating: false,
  video_create_error: null,
  video_delete: null,
  video_deleting: false,
  video_delete_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VIDEOS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case VIDEOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        videos: action.payload,
      };

    case VIDEOS_FAIL:
      return {
        ...state,
        videos: null,
        isLoading: false,
        error: action.payload,
      };
    case SET_VIDEO_EDIT:
      return {
        ...state,
        video_edit: action.payload,
      };
    case DELETE_VIDEO_EDIT:
      return {
        ...state,
        video_edit: null,
      };
    case EDIT_VIDEO:
      return {
        ...state,
        video_editing: true,
      };
    case EDIT_VIDEO_SUCCESS:
      return {
        ...state,
        video_editing: false,
        videos: {
          ...state.videos,
          results: state.videos.results.map((video) =>
            video.id === action.payload.id ? (video = action.payload) : video
          ),
        },
      };

    case EDIT_VIDEO_FAIL:
      return {
        ...state,
        video_editing: false,
        video_edit_error: action.payload,
      };
    case CREATE_VIDEO:
      return {
        ...state,
        video_creating: true,
      };
    case CREATE_VIDEO_SUCCESS:
      console.log("action.payload", action.payload);

      return {
        ...state,
        video_creating: false,
        videos: {
          ...state.videos,
          results: [action.payload, ...state.videos.results],
        },
      };

    case CREATE_VIDEO_FAIL:
      return {
        ...state,
        video_creating: false,
        video_create_error: action.payload,
      };
    case DELETE_VIDEO:
      return {
        ...state,
        video_delete: action.payload,
        video_deleting: true,
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        video_deleting: false,
        videos: {
          ...state.videos,
          results: state.videos.results.filter(
            (video) => video.id !== state.video_delete
          ),
        },
        video_delete: null,
      };

    case DELETE_VIDEO_FAIL:
      return {
        ...state,
        video_deleting: false,
        video_delete: null,
        video_delete_error: action.payload,
      };
    default:
      return state;
  }
}
