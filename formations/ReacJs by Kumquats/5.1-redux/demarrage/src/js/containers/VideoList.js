import React from 'react';
import VideoItem from '../components/VideoItem';
import request from 'superagent';
import config from 'config';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions';

class VideoList extends React.Component {
    render() {
        return (
            <div className="row marketing">
                <div className="col-lg-12">
                    <ul className="media-list">
                        {this.props.videos.map( video => (
                          <VideoItem key={video.id} video={video} />
                        ) )}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.dispatch( fetchVideos() );
    }
}

function mapStateToProps( state ) {
    return {
        videos: state.videos
    }
}

export default connect( mapStateToProps )( VideoList );