import { put, takeLatest, call } from 'redux-saga/effects';
import { StockService } from '../services/stockService';

function* fetchStock(action) {
    try {
        const response = yield call(StockService.getList, action.payload);
        yield put({
            type: 'FETCH_STOCK_LIST_SUCCESS', data: response.data.items,
            columns: response.data.columns, orderColumns: response.data.orderColumns,
            totalCount: response.data.totalCount, pageSize: response.data.pageSize, pageNo: response.data.pageNo
        });
    } catch (e) {
        yield put({ type: 'FETCH_STOCK_LIST_FAIL', message: e.message });
    }
}

function* createOrder(action) {
    try {
        const response = yield call(StockService.createOrder, action.payload);
        yield put({ type: 'CREATE_ORDER_SUCCESS', order: response.data });
    } catch (e) {
        yield put({ type: 'CREATE_ORDER_FAIL', errorMessage: e.message });
    }
}

function* stockSaga() {
    yield takeLatest('FETCH_STOCK_LIST_REQUEST', fetchStock);
    yield takeLatest('CREATE_ORDER_REQUEST', createOrder);
}

export default stockSaga;
