
import {
    VIDEOS_PACK_FETCH,
    VIDEOS_PACK_SUCCESS,
    VIDEOS_PACK_FAIL,
    VIDEOS_PACK_ADD,
    VIDEOS_PACK_ADD_SUCCESS,
    VIDEOS_PACK_ADD_FAIL,
    VIDEOS_PACK_REMOVE,
    VIDEOS_PACK_REMOVE_SUCCESS,
    VIDEOS_PACK_REMOVE_FAIL
} from "../../types";

const initialState = {
    isLoading: false,
    videos:  {
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
        case VIDEOS_PACK_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case VIDEOS_PACK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                videos: action.payload
            };

        case VIDEOS_PACK_FAIL:
            return {
                ...state,
                videos: null,
                isLoading: false,
                error: action.payload
            };
        case VIDEOS_PACK_ADD:
            return {
            ...state,
            video_adding: true,
            };
        case VIDEOS_PACK_ADD_SUCCESS:
            return {
            ...state,
            video_adding: false,
            videos: {
                ...state.videos,
                results: [action.payload, ...state.videos.results],
            },
            };
    
        case VIDEOS_PACK_ADD_FAIL:
            return {
            ...state,
            video_adding: false,
            video_adding_error: action.payload,
            };
        case VIDEOS_PACK_REMOVE:
            return {
                ...state,
                video_removing: true,
                video_remove: action.payload
            };
        case VIDEOS_PACK_REMOVE_SUCCESS:
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
    
        case VIDEOS_PACK_REMOVE_FAIL:
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