import { createStore, applyMiddleware, compose } from 'redux';
import { StockReducer } from './Stock/reducers/stockReducer';
import createSagaMiddleware from 'redux-saga';
import stockSaga from './Stock/sagas/stockSaga';
import { all, fork } from 'redux-saga/effects';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(StockReducer, initialState, compose(
    applyMiddleware(
        sagaMiddleware
    )
));

// function* rootSaga() {
//     yield all([
//       fork(stockSaga),
//     ]);
//   }

  sagaMiddleware.run(stockSaga);

export default store;
