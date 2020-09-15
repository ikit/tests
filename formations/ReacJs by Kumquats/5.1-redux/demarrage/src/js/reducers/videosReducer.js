import { VIDEO_LIST_COMPLETE } from '../actions';

export default function videosReducer( state = [], action ) {
    if (action.type == VIDEO_LIST_COMPLETE) {
        return action.videos;
    }
    return state;
}