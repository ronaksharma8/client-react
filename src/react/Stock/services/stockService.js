import { Get, Post, Put } from '../../serviceBase';

export const StockService = {
  //Level Two
  getList: searchFilter => Get({ url: 'Stock', params: searchFilter }),
  createOrder: orderItem => Post({ url: 'Stock', params: orderItem })
};


