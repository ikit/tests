import { VIDEO_DETAIL_COMPLETE } from '../actions';

export default function videoReducer(state = null, action) {
    if (action.type == VIDEO_DETAIL_COMPLETE) {
        return action.video;
    }
    return state;
}