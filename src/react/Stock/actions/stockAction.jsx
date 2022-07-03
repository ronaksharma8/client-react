import { FETCH_STOCK_LIST_REQUEST, CREATE_ORDER_REQUEST } from './stockTypes';

export const FETCH_STOCK_LIST = (e) => {
  return {
    type: FETCH_STOCK_LIST_REQUEST,
    payload: e
  }
}

export const CREATE_ORDER_REQ = (e) => {
  return {
    type: CREATE_ORDER_REQUEST,
    payload: e
  }
}

