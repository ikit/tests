import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers';
import thunk from 'redux-thunk';



export default function configureStore( browserHistory ) {
	
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	
	const store = createStore(
		createRootReducer(browserHistory),
	  composeEnhancers(
	    applyMiddleware(
				thunk, 
				routerMiddleware( browserHistory ))
	  )
	);
	return store;
}