import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

export default function VideoItem( props ) {
    return (
        <li className="media">
            <div className="media-left">
                <img className="media-object"
                    alt="cat" src={`${config.basePath}/uploads/thumbnails/${props.video.thumbnail}`}
                    width="246"
                    height="138" />
            </div>
            <div className="media-body">
                <h4 className="media-heading">{props.video.title}</h4>
                <p>{props.video.description}</p>
            </div>
        </li>        
    )
}

VideoItem.propTypes = {
    video: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
}