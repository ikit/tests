import request from 'superagent';
import config from 'config';

export const VIDEO_LIST_COMPLETE = 'VIDEO_LIST_COMPLETE';

export function fetchVideos() {
    return function( dispatch, getState ) {
        request
        .get( `${config.apiPath}/videos` )
        .then( res => {
            dispatch( {
                type: VIDEO_LIST_COMPLETE,
                videos: res.body
            } )
        } )
    }
}

export const VIDEO_DETAIL_COMPLETE = 'VIDEO_DETAIL_COMPLETE';

export function fetchVideo( id ) {
    return function( dispatch, getState ) {
        request
            .get(`${config.apiPath}/videos/${id}`)
            .then(res => {
                dispatch({
                    type: VIDEO_DETAIL_COMPLETE,
                    video: res.body
                })
            });
    }
}

export const COMMENT_LIST_COMPLETE = 'COMMENT_LIST_COMPLETE';

export function fetchComments( id ) {
    return function( dispatch ) {
        request
            .get(`${config.apiPath}/videos/${id}/comments`)
            .then(res => {
                dispatch({
                    type: COMMENT_LIST_COMPLETE,
                    comments: res.body
                })
            })
    }
}

export function addComment( id, content ) {
    return function( dispatch ) {
        return request
            .post(`${config.apiPath}/videos/${id}/comments`)
            .field('content', content )
            .then(res => {
                dispatch( fetchComments( id ) )
            })        
    }
}