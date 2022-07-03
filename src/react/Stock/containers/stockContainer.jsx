import React, { Component } from 'react'
import { StockComponent } from '../components/stockComponent';
import { connect } from 'react-redux';
import { FETCH_STOCK_LIST, CREATE_ORDER_REQ } from '../actions/stockAction';

class StockContainer extends Component {
    render() {
        return (
            <div>
                <StockComponent {...this.props}></StockComponent>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data : state.data,
        columns: state.columns,
        tableDef: state.tableDef,
        orderTableDef: state.orderTableDef,
        totalCount: state.totalCount,
        pageSize: state.pageSize,
        pageNo: state.pageNo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataList: (e) => dispatch(FETCH_STOCK_LIST(e)),
        createOrder: (e) => dispatch(CREATE_ORDER_REQ(e)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);