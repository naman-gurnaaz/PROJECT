import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes';
import { leaders } from './leaders';
import { promotions } from './promotions';
import { comments } from './comments';
import { favourites } from './favourites'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders,
            favourites
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}