import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Utils from '../../common/utils/utils';
import { Button } from '@mui/material';

export const StockTable = ({ data, tableDef, handleOrder, getDataList, totalCount, pageSize = 50, pageNo = 1 }) => {

    const newTableDef = Utils.AppendActionButton(tableDef, handleOrder);

    const handlePageChange = (page) => {
        var pageData = {
            pageSize: pageSize,
            pageNo: page + 1
        }
        getDataList(pageData);
    }

    const handlePageSizeChange = (pageSize) => {
        var pageData = {
            pageSize: pageSize,
            pageNo: 1
        }
        getDataList(pageData);
    }

    return (
        <>
            <Box sx={{ height: 1000, width: '100%' }}>
                <DataGrid getRowId={(row) => row.stockId} rows={data} columns={newTableDef}
                    pagination paginationMode="server" rowCount={totalCount}
                    rowsPerPageOptions={[25, 50, 100]} page={pageNo - 1} pageSize={pageSize}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange} />
            </Box>
        </>
    );
};

export const OrderTable = ({ orders, orderTableDef, handleRemoveOrders, handleBookOrders }) => {

    const newTableDef = Utils.AppendStatusLabel(orderTableDef);

    const [selectedOrders, setSelectionOrders] = useState([]);

    const setRowDisable = (params) => {
        if (params.row.status === 'In-Progress') {
            return false;
        }
        return true;
    };

    const disableRemoveButton = () => {
        return (selectedOrders.length === 0);
    }

    const disableBookButton = () => {
        return (selectedOrders.length === 0 || selectedOrders.some(p => p.status === 'Not Ready' || p.status === 'Booked'));
    }

    const removeSelectedOrders = () => {
        handleRemoveOrders(selectedOrders);
        setSelectionOrders([]);
    }

    const bookSelectedOrders = () => {
        handleBookOrders(selectedOrders);
        setSelectionOrders([]);
    }

    return (
        <>
            <Button variant="contained" color="warning" disabled={disableRemoveButton()}
                onClick={removeSelectedOrders} >
                Remove
            </Button>
            <Button variant="contained" color="primary" disabled={disableBookButton()}
                onClick={bookSelectedOrders}>
                Book
            </Button>
            <Box sx={{ height: 1000, width: '100%' }}>
                <DataGrid rows={orders} columns={newTableDef}
                    disableSelectionOnClick
                    checkboxSelection
                    isRowSelectable={setRowDisable}
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = orders.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        setSelectionOrders(selectedRowData);
                    }}
                />
            </Box>
        </>
    );
};