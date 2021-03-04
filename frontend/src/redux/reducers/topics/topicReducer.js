import {
  TOPIC_FETCH,
  TOPIC_SUCCESS,
  TOPIC_FAIL,
  TOPIC_SAVE,
  TOPIC_SAVE_SUCCESS,
  TOPIC_SAVE_FAIL,
  TOPIC_PICTURE_UPLOAD,
  TOPIC_PICTURE_SUCCESS,
  TOPIC_PICTURE_FAIL,
  REMOVE_TOPIC,
  REMOVE_TOPIC_SUCCESS,
  REMOVE_TOPIC_FAIL,
  RESET_TOPICS_ERRORS
} from "../../types";

const initialState = {
  isLoading: true,
  topic: null,
  error: null,
  topic_saving: false,
  save_error: null,
  picture_uploading: false,
  picture_error: null,
  publishing: false,
  publish_error: null,
  canceling_published: false,
  canceling_published_error: null,
  removing_topic: false,
  removing_topic_error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOPIC_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case TOPIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topic: action.payload,
      };

    case TOPIC_FAIL:
      return {
        ...state,
        topic: null,
        isLoading: false,
        error: action.payload,
      };
    case TOPIC_SAVE:
      return {
        ...state,
        topic_saving: true,
      };
    case TOPIC_SAVE_SUCCESS:
      return {
        ...state,
        topic_saving: false,
        save_error: null,

        topic: {
          ...action.payload,
        },
      };
    case TOPIC_SAVE_FAIL:
      return {
        ...state,
        topic_saving: false,
        save_error: action.payload,
      };
    case TOPIC_PICTURE_UPLOAD:
      return {
        ...state,
        picture_uploading: true,
      };
    case TOPIC_PICTURE_SUCCESS:
      return {
        ...state,
        picture_uploading: false,
        topic: {
          ...state.topic,
          pricture: action.payload,
        picture_error: null,

        },
      };
    case TOPIC_PICTURE_FAIL:
      return {
        ...state,
        picture_uploading: false,
        picture_error: action.paylod,
      };
    case REMOVE_TOPIC:
      return {
        ...state,
        removing_topic: true,
      };
    case REMOVE_TOPIC_SUCCESS:
      return {
        ...state,
        removing_topic: false,
        removing_topic_error: null,
        topic: null,
      };
    case REMOVE_TOPIC_FAIL:
      return {
        ...state,
        removing_topic: false,
        removing_topic_error: action.payload,
      };
    case RESET_TOPICS_ERRORS:
      return {
        ...state,
        removing_topic_error: null,
        publish_error: null,
        
        canceling_published_error: null,
        picture_error: null,
        save_error: null,

      }
    default:
      return state;
  }
}
