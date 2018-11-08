import React from 'react';
import VideoItem from './VideoItem';
import request from 'superagent';
import config from 'config';

class VideoList extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            videos: []
        }
    }

    render() {
        return (
            <div className="row marketing">
                <div className="col-lg-12">
                    <ul className="media-list">
                        {this.state.videos.map( video => (
                          <VideoItem key={video.id} video={video} />
                        ) )}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        request
            .get( `${config.apiPath}/videos` )
            .then( res => {
                this.setState( {
                    videos: res.body
                } )
            } )
    }
}

export default VideoList;