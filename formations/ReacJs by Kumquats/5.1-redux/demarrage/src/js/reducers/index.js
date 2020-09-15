import { combineReducers } from 'redux';

import commentsReducer from './commentsReducer';
import videosReducer from './videosReducer';
import videoReducer from './videoReducer';

export default combineReducers({
    comments: commentsReducer,
    videos: videosReducer,
    video: videoReducer
})