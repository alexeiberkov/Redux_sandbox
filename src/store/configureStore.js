import {createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk));

    if (module.hot) {
        module.hot.accept(rootReducer, function() {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
