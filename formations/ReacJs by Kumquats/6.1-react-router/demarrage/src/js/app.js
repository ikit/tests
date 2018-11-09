import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";

import Layout from './containers/Layout';
import reducer from "./reducers";
import configureStore from './store/configureStore';
import config from 'config'

const browserHistory = createBrowserHistory({
  basename: config.basePath 
});

const store = configureStore( browserHistory );

ReactDOM.render(
    <Provider store={store}>
		<ConnectedRouter history={browserHistory}>
			<Layout />
		</ConnectedRouter>
    </Provider>
	, document.querySelector('#appContainer')
);