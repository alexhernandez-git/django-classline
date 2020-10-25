
import {
    VIDEOS_TOPIC_FETCH,
    VIDEOS_TOPIC_SUCCESS,
    VIDEOS_TOPIC_FAIL,
    VIDEOS_TOPIC_ADD,
    VIDEOS_TOPIC_ADD_SUCCESS,
    VIDEOS_TOPIC_ADD_FAIL,
    VIDEOS_TOPIC_REMOVE,
    VIDEOS_TOPIC_REMOVE_SUCCESS,
    VIDEOS_TOPIC_REMOVE_FAIL
} from "../../types";

const initialState = {
    isLoading: false,
    videos: {
        results: []
    },
    error: null,
    video_adding: false,
    video_adding_error: null,
    video_removing: false,
    video_removing_error: null,
    video_remove: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VIDEOS_TOPIC_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case VIDEOS_TOPIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                videos: action.payload
            };

        case VIDEOS_TOPIC_FAIL:
            return {
                ...state,
                videos: null,
                isLoading: false,
                error: action.payload
            };
        case VIDEOS_TOPIC_ADD:
            return {
            ...state,
            video_adding: true,
            };
        case VIDEOS_TOPIC_ADD_SUCCESS:
            return {
            ...state,
            video_adding: false,
            videos: {
                ...state.videos,
                results: [action.payload, ...state.videos.results],
            },
        };
    
        case VIDEOS_TOPIC_ADD_FAIL:
            return {
            ...state,
            video_adding: false,
            video_adding_error: action.payload,
            };
        case VIDEOS_TOPIC_REMOVE:
            return {
                ...state,
                video_removing: true,
                video_remove: action.payload
            };
        case VIDEOS_TOPIC_REMOVE_SUCCESS:
        return {
            ...state,
            video_removing: false,
            videos: {
                ...state.videos,
                results: state.videos.results.filter(
                    (video_pack) => video_pack.video.id !== state.video_remove
                ),
            },
            video_removing_error: null,

        };
    
        case VIDEOS_TOPIC_REMOVE_FAIL:
            return {
                ...state,
                video_removing: false,
                video_removing_error: action.payload,
                video_remove: null
            };
        default:
            return state;
    }
}