import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';

import { LineChart, XAxis, YAxis, Line } from 'recharts';

import Box from '@mui/material/Box';

import { actions, fetchAllSalesData, IViewSalesDataState } from './index.slice';
import { AppDispatch } from '../../App';
import { IProduct } from '../../models/Product';


// **** Types **** //

interface ISalesLineGraphState {
  productId: string;
  fetchAllSalesDataStatus: IViewSalesDataState['fetchAllSalesDataStatus'];
  salesDataFull: IProduct['sales'];
}


// **** Components **** //

/**
 * Display line chart for sales data.
 */
function SalesLineGraph() {
  const dispatch = useDispatch<AppDispatch>();

  // Initialize state
  const {
    productId,
    fetchAllSalesDataStatus,
    salesDataFull,
  } = useSelector<IViewSalesDataState, ISalesLineGraphState>(state => ({
    productId: state.productId,
    fetchAllSalesDataStatus: state.fetchAllSalesDataStatus,
    salesDataFull: state.salesDataFull,
  }), shallowEqual);

  // Fetch the productId
  useEffect(() => {
    if (!!productId) {
      dispatch(fetchAllSalesData({
        productId: productId,
      }));
    }
  }, [dispatch, productId]);

  // Return
  return (
    <Box>
      <LineChart
        width={730}
        height={250}
        data={salesDataFull.data.map(sale => ({
          name: sale.weekEnding,
          uv: sale.unitsSold,
          pv: sale.retailSales,
        }))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="weekEnding" />
        <YAxis />

        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
}


// **** Export default **** //

export default SalesLineGraph;
