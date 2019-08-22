/**
 * setting up store to change their state only once promises gets resolved
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`);
    const logger = createLogger({
        collapsed: true
    });
    middleware.push(logger);
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;