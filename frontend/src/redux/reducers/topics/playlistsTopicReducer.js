
import {
    PLAYLISTS_TOPIC_FETCH,
    PLAYLISTS_TOPIC_SUCCESS,
    PLAYLISTS_TOPIC_FAIL,
    PLAYLISTS_TOPIC_ADD,
    PLAYLISTS_TOPIC_ADD_SUCCESS,
    PLAYLISTS_TOPIC_ADD_FAIL,
    PLAYLISTS_TOPIC_REMOVE,
    PLAYLISTS_TOPIC_REMOVE_SUCCESS,
    PLAYLISTS_TOPIC_REMOVE_FAIL
} from "../../types";

const initialState = {
    isLoading: false,
    playlists:  {
        results: []
    },
    error: null,
    playlist_adding: false,
    playlist_adding_error: null,
    playlist_removing: false,
    playlist_removing_error: null,
    playlist_remove: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PLAYLISTS_TOPIC_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case PLAYLISTS_TOPIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                playlists: action.payload
            };

        case PLAYLISTS_TOPIC_FAIL:
            return {
                ...state,
                playlists: null,
                isLoading: false,
                error: action.payload
            };
        case PLAYLISTS_TOPIC_ADD:
            return {
            ...state,
            playlist_adding: true,
            };
        case PLAYLISTS_TOPIC_ADD_SUCCESS:
            return {
            ...state,
            playlist_adding: false,
            playlists: {
                ...state.playlists,
                results: [action.payload, ...state.playlists.results],
            },
            };
    
        case PLAYLISTS_TOPIC_ADD_FAIL:
            return {
            ...state,
            playlist_adding: false,
            playlist_adding_error: action.payload,
            };
        case PLAYLISTS_TOPIC_REMOVE:
            return {
                ...state,
                playlist_removing: true,
                playlist_remove: action.payload
            };
        case PLAYLISTS_TOPIC_REMOVE_SUCCESS:
        return {
            ...state,
            playlist_removing: false,
            playlists: {
                ...state.playlists,
                results: state.playlists.results.filter(
                    (playlist_pack) => playlist_pack.playlist.id !== state.playlist_remove
                ),
            },
            playlist_removing_error: null,

        };
    
        case PLAYLISTS_TOPIC_REMOVE_FAIL:
            return {
                ...state,
                playlist_removing: false,
                playlist_removing_error: action.payload,
                playlist_remove: null
            };
        default:
            return state;
    }
}