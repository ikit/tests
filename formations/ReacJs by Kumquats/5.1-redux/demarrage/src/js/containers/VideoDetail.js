import React from 'react';
import request from 'superagent';
import config from 'config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVideo, fetchComments, addComment } from '../actions';

class VideoDetail extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
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
                            this.props.video &&
                            <div className="caption">
                                <video
                                    style={{ width: '100%', backgroundColor: 'black'}}
                                    ref={ el => this.videoElem = el }
                                    height="300"
                                    controls
                                    muted
                                    src={`${config.basePath}/uploads/${this.props.video.file}`}
                                >
                                </video>
                                <h3>{this.props.video.title}</h3>
                                {
                                    this.props.video.description &&
                                    <p>{this.props.video.description}</p>
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
                                    {this.props.comments.map( comment => (
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
        this.props.addComment( this.state.id, this.state.newComment )
            .then( () => {
                this.setState({ newComment: '', isLoading: false })
            } )
    }

    playVideo() {
        if ( this.videoElem )
        {
            this.videoElem.play();
        }
    }

    fetchComments() {
        this.props.fetchComments( this.state.id );
    }

    componentDidMount() {
        this.playVideo();
        this.props.fetchVideo( this.state.id );
        this.fetchComments();
    }

    componentDidUpdate() {
        this.playVideo();
    }
}

function mapStateToProps( state ) {
    return {
        video: state.video,
        comments: state.comments
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { fetchVideo, fetchComments, addComment }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps)(VideoDetail);