import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import video from './video';
import comments from './comments';
import newComment from './newComment';
import newVideo from './newVideo';
import videos from './videos';

export default (history) => combineReducers({
	router: connectRouter(history),
	video,
	comments,
	newComment,
	newVideo,
	videos
});