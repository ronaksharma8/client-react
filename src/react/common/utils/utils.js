import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import '../../Stock/stock.css'

export default class Utils {

  static AppendActionButton(tableDef, handleOrder) {

    const actionButton = [{
      field: 'Buy',
      headerName: 'Action',
      width: 160,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e,action) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          handleOrder(thisRow, action);
        };
        return(
          <>
          <Button onClick={(e) => onClick(e,'Buy')}>Buy</Button>
          <Button onClick={(e) => onClick(e,'Sell')}>Sell</Button>
          </>
        );
      }
    }];

    const res = [...tableDef, ...actionButton];
    return res;
  }

  static createTableDef(columns) {
    const tableDef = columns
      .map(col => {
        return {
          field: col.name,
          headerName: col.text,
          type: col.dataType,
          sortable: col.sortable,
          hide: col.hidden,
          editable: col.editable,
          width: col.columnWidth,
          order: col.columnOrder,
          valueOptions : col.values
        }
      });
    return tableDef.sort((a, b) => (a.order > b.order) ? 1 : -1);
  }

  static createOrder(stock, action) {
    return {
      id: uuidv4(),
      stockId: stock.stockId,
      status: 'Ready',
      orderType: action,
      bloombergTickerLocal: stock.bloombergTickerLocal,
      executionMode: 'Market',
      orderPrice: stock.price,
      currency: stock.currency,
      amount: this.generateRandomNumber(),
      error: '',
    };
  }

  static generateRandomNumber(){
    return Math.floor(Math.random() * 1000) + 1;
  }

  static AppendStatusLabel(tableDef) {

    const idLabel = [{
      field: 'id',
      headerName: 'id',
      hide: true,
      width: 160
    }];

    const statusLabel = [{
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        if (params.row.status === 'Not Ready') {
          return <span className={'label warning'}>Not Ready</span>;
        }
        else if (params.row.status === 'Ready') {
          return <span className={'label info'}>Ready</span>;
        }
        else if (params.row.status === 'Booked') {
          return <span className={'label success'}>Booked</span>;
        }
        else if (params.row.status === 'In-Progress') {
          return <span className={'label primary'}>In-Progress</span>;
        }
        else if (params.row.status === 'Rejected') {
          return <span className={'label danger'}>Rejected</span>;
        }
      }
    }]

    const res = [...idLabel, ...statusLabel, ...tableDef ];
    return res;
  }

  static createOrderReq(order){
    return {
      stockId: order.stockId,
      orderType: 1,
      stockCode: order.bloombergTickerLocal,
      executionMode: 1,
      orderPrice: order.orderPrice,
      amount: order.amount
    }
  }
}