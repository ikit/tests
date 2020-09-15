import React from 'react';
import videos from './videos';

class VideoDetail extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            video: videos[ 0 ]
        }
        this.nextVideo = this.nextVideo.bind( this );
    }

    render() {
        return (
            <div className="row marketing">
                <div className="col-sm-12 col-md-12">
                    <div className="video-detail">
                        <div className="caption">
                            <video
                                style={{ width: '100%', backgroundColor: 'black'}}
                                ref={ el => this.videoElem = el }
                                height="300"
                                controls
                                muted
                                src={this.state.video.file}
                            >
                            </video>
                            <h3>{this.state.video.title}</h3>
                            {
                                this.state.video.description &&
                                <p>{this.state.video.description}</p>
                            }
                            <button className="btn btn-primary" onClick={this.nextVideo}>Video suivante</button>
                        </div>
                    </div>
                </div>

            </div>            
        )
    }

    playVideo() {
        if ( this.videoElem )
        {
            this.videoElem.play();
        }
    }

    componentDidMount() {
        this.playVideo();
    }

    componentDidUpdate() {
        this.playVideo();
    }

    nextVideo() {
        const index = videos.findIndex( video  => this.state.video.id == video.id );
        this.setState( { video: videos[ index + 1 == videos.length ? 0 : ( index + 1 ) ] } );
    }
}

export default VideoDetail;