
import {
    PODCASTS_PACK_FETCH,
    PODCASTS_PACK_SUCCESS,
    PODCASTS_PACK_FAIL,
    PODCASTS_PACK_ADD,
    PODCASTS_PACK_ADD_SUCCESS,
    PODCASTS_PACK_ADD_FAIL,
    PODCASTS_PACK_REMOVE,
    PODCASTS_PACK_REMOVE_SUCCESS,
    PODCASTS_PACK_REMOVE_FAIL
} from "../../types";

const initialState = {
    isLoading: false,
    podcasts:  {
        results: []
    },
    error: null,
    podcast_adding: false,
    podcast_adding_error: null,
    podcast_removing: false,
    podcast_removing_error: null,
    podcast_remove: null

}

export default function (state = initialState, action) {
    switch (action.type) {
        case PODCASTS_PACK_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case PODCASTS_PACK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                podcasts: action.payload
            };

        case PODCASTS_PACK_FAIL:
            return {
                ...state,
                podcasts: null,
                isLoading: false,
                error: action.payload
            };
        case PODCASTS_PACK_ADD:
            return {
            ...state,
            podcast_adding: true,
            };
        case PODCASTS_PACK_ADD_SUCCESS:
            return {
            ...state,
            podcast_adding: false,
            podcasts: {
                ...state.podcasts,
                results: [action.payload, ...state.podcasts.results],
            },
            };
    
        case PODCASTS_PACK_ADD_FAIL:
            return {
            ...state,
            podcast_adding: false,
            podcast_adding_error: action.payload,
            };
        case PODCASTS_PACK_REMOVE:
            return {
                ...state,
                podcast_removing: true,
                podcast_remove: action.payload

            };
        case PODCASTS_PACK_REMOVE_SUCCESS:
        return {
            ...state,
            podcast_removing: false,
            podcasts: {
                ...state.podcasts,
                results: state.podcasts.results.filter(
                    (podcast_pack) => podcast_pack.podcast.id !== state.podcast_remove
                ),
            },
            podcast_removing_error: null,

        };
    
        case PODCASTS_PACK_REMOVE_FAIL:
            return {
                ...state,
                podcast_removing: false,
                podcast_removing_error: action.payload,
                podcast_remove: null

            };
        default:
            return state;
    }
}