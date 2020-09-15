import React from 'react';
import request from 'superagent';
import config from 'config';

class VideoDetail extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            video: null,
            comments: [],
            id: 1,
            newComment: '',
            isLoading: false
        }
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleCommentChange = this.handleCommentChange.bind( this );
    }

    render() {
        return (
            <div className="row marketing">
                <div className="col-sm-12 col-md-12">
                    <div className="video-detail">
                        {
                            this.state.video &&
                            <div className="caption">
                                <video
                                    style={{ width: '100%', backgroundColor: 'black'}}
                                    ref={ el => this.videoElem = el }
                                    height="300"
                                    controls
                                    muted
                                    src={`${config.basePath}/uploads/${this.state.video.file}`}
                                >
                                </video>
                                <h3>{this.state.video.title}</h3>
                                {
                                    this.state.video.description &&
                                    <p>{this.state.video.description}</p>
                                }
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <label for="content">Ajouter un commentaire</label>
                                        <textarea
                                            class="form-control"
                                            name="content"
                                            id="content"
                                            cols="30"
                                            rows="2"
                                            disabled={this.state.isLoading}
                                            value={this.state.newComment}
                                            onChange={this.handleCommentChange}
                                        />
                                    </div>
                                    <button type="submit" class="btn btn-default" disabled={this.state.isLoading}>
                                        {this.state.isLoading ? 'Chargement...' : 'Envoyer' }
                                    </button>
                                </form>
                                <div class="comments">
                                    <h4>Commentaires: </h4>
                                    {this.state.comments.map( comment => (
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <h6><small>{(new Date(comment.created_at)).toLocaleString()}</small></h6>
                                                {comment.content}
                                                </div>
                                        </div>                                        
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>            
        )
    }

    handleCommentChange( event ) {
        this.setState({ newComment: event.target.value });
    }

    handleSubmit( event ) {
        event.preventDefault();
        this.setState({ isLoading: true });
        request
            .post(`${config.apiPath}/videos/${this.state.id}/comments` )
            .field( 'content', this.state.newComment )
            .then( res => {
                this.fetchComments();
                this.setState( { newComment: '', isLoading: false });
            } )
    }

    playVideo() {
        if ( this.videoElem )
        {
            this.videoElem.play();
        }
    }

    fetchComments() {
        request
            .get( `${config.apiPath}/videos/${this.state.id}/comments` )
            .then( res => {
                this.setState({ comments: res.body })
            } )
    }

    componentDidMount() {
        this.playVideo();
        request
            .get( `${config.apiPath}/videos/${this.state.id}` )
            .then( res => {
                this.setState({ video: res.body })
            });
        this.fetchComments();
    }

    componentDidUpdate() {
        this.playVideo();
    }
}

export default VideoDetail;