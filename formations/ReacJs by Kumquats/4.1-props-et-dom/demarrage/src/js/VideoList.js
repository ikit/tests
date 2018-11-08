import React from 'react';
import videos from './videos';
import VideoItem from './VideoItem';

class VideoList extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            videos: videos
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
        setInterval( () => {
            const index = this.state.videos.length + 1;
            this.setState( {
                videos: [ 
                    {
                        id: index,
                        title: 'Ma vidéo ' + index,
                        description: 'Ceci est une super vidéo',
                        file: `uploads/video${index}.mp4`,
                        thumbnail: `uploads/thumbnails/video${index}.jpg`,
                    },
                    ...this.state.videos
                ]
            } )
        }, 5000 );
    }
}

export default VideoList;