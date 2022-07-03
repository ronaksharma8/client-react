import React from 'react';
import Utils from '../../common/utils/utils';
import { FETCH_STOCK_LIST_SUCCESS, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from '../actions/stockTypes';

const initialState = {
    data: [],
    columns: [],
    tableDef: [],
    orderTableDef: [],
    totalCount: 0,
    pageSize: 0,
    pageNo: 0,
    order: {}
};

export const StockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STOCK_LIST_SUCCESS:
            debugger;
            const tableDef = Utils.createTableDef(action.columns);
            const orderTableDef = Utils.createTableDef(action.orderColumns);
            return {
                ...state, data: action.data, columns: action.columns, tableDef: tableDef,
                orderTableDef: orderTableDef, totalCount: action.totalCount, pageSize: action.pageSize, pageNo: action.pageNo
            }
        case CREATE_ORDER_SUCCESS:
            return { ...state, order: action.data }
        case CREATE_ORDER_FAIL:
            return { ...state, errorMessage: action.errorMessage }
        default:
            return { ...initialState };
    }
};
