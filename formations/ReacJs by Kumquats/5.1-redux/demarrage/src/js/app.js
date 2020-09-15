import React from 'react';
import ReactDOM from 'react-dom';
import VideoDetail from './containers/VideoDetail';
import VideoList from './containers/VideoList';
import VideoForm from './containers/VideoForm';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <VideoDetail />
    </Provider>,
   document.querySelector( '#appContainer' ) 
);
