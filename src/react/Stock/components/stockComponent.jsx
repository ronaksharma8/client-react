import React, { Component } from 'react';
import { StockTable, OrderTable } from './stock';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Utils from '../../common/utils/utils';

const tabs = [
    {
        name: 'Stock List',
        tableComponent: StockTable,
        index: 0
    },
    {
        name: 'Order List',
        tableComponent: OrderTable,
        index: 1
    }
];

export class StockComponent extends Component {
    state = {
        selectedIndex: 0,
        orders: []
    };

    componentDidMount() {
        const { getDataList } = this.props;
        getDataList();
    }

    handleChangeTab = index => {
        this.setState({ selectedIndex: index });
    };

    handleOrder = (item, action) => {
        debugger;
        const { orders } = this.state;
        var newOrders = [...orders];

        var newOrder = Utils.createOrder(item, action);
        newOrders.push(newOrder);
        this.setState({ orders: newOrders });
    };

    handleRemoveOrders = (items) => {
        const { orders } = this.state;
        const removedOrders = orders.filter(ar => !items.find(rm => (rm.id === ar.id)));
        this.setState({ orders: removedOrders });
    };

    handleBookOrders = (items) => {
        const { orders, createOrder, order, errorMessage } = this.props;
        debugger;
        items.forEach(element => {
            const createOrderReq = Utils.createOrderReq(element);
            // debugger;
            // createOrder(createOrderReq);
            // debugger;
            // console.log(order);
            // console.log(errorMessage);

            const myPromise = new Promise((resolve, reject) => {
                createOrder(createOrderReq);
                resolve('Promise is resolved successfully.');
            });

            myPromise.then((message) => {
                console.log(order);
                console.log(errorMessage);
            });
        });

        //update state
        // const newOrders = data.map(obj => {
        //     if (obj.id === 2) {
        //         return { ...obj, country: 'Denmark' };
        //     }
        //     return obj;
        // });
    }

    render() {
        const { data, tableDef, orderTableDef, totalCount, pageSize, pageNo, getDataList } = this.props;
        const { orders } = this.state;
        const tab = tabs[this.state.selectedIndex];
        const TableComponent = tab.tableComponent;
        return (
            <>
                <Tabs onSelect={this.handleChangeTab}>
                    <TabList>
                        {
                            tabs.map(tab => {
                                return <Tab key={tab.index}>{tab.name}</Tab>
                            })
                        }
                    </TabList>
                    <TabPanel>
                        <TableComponent data={data} tableDef={tableDef} handleOrder={this.handleOrder}
                            totalCount={totalCount} pageSize={pageSize} pageNo={pageNo}
                            getDataList={getDataList} ></TableComponent>
                    </TabPanel>
                    <TabPanel>
                        <TableComponent orders={orders} orderTableDef={orderTableDef}
                            handleRemoveOrders={this.handleRemoveOrders}
                            handleBookOrders={this.handleBookOrders}>
                        </TableComponent>
                    </TabPanel>
                </Tabs>
            </>
        )
    }
}



export default StockComponent;

