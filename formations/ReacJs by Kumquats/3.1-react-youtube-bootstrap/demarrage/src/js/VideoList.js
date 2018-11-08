import React from 'react';
import videos from './videos';

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
                            <li className="media">
                                <div className="media-left">
                                    <img className="media-object"
                                        alt="cat" src={video.thumbnail}
                                        width="246"
                                        height="138" />
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">{video.title}</h4>
                                    <p>{video.description}</p>
                                </div>
                            </li>                            
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