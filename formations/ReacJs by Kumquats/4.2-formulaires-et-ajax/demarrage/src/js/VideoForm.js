import React from 'react';
import request from 'superagent';
import config from 'config';

class VideoForm extends React.Component {
    constructor(...args) {
        super(...args);
        this.handleSubmit = this.handleSubmit.bind( this );
        this.state = { isSubmitted: false };
    }

    render() {
        return (
            <div>
                { this.state.isSubmitted ? 
                    <p>La vidéo a bien été envoyée</p> :
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="">Titre</label>
                            <input ref={el => this.titleInput = el} type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <textarea ref={el => this.descInput = el} name="description" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div>
                            <label htmlFor="">Fichier</label>
                            <input ref={el => this.fileInput = el} type="file"/>
                        </div>
                        <button type="submit">Envoyer</button>
                    </form>
                }
            </div>
        )
    }

    handleSubmit( event ) {
        event.preventDefault();
        request
            .post( `${config.apiPath}/videos` )
            .field( 'title', this.titleInput.value )
            .field( 'description', this.descInput.value )
            .attach( 'file', this.fileInput.files[ 0 ] )
            .then( res => {
                this.setState( { isSubmitted: true } )
            } )
    }
}

export default VideoForm;