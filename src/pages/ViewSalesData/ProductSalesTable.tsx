import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';

import Box from '@mui/material/Box';

import { actions, IViewSalesDataState } from './index.slice';
import { AppDispatch } from '../../App';
import { IProduct } from '../../models/Product';


// **** Types **** //

interface IProductSalesTableState {
  product: IProduct;
  fetchProductStatus: IViewSalesDataState['fetchProductStatus'];
}


// **** Components **** //

/**
 * Table component for sales data.
 */
function ProductSalesTable() {
  const dispatch = useDispatch<AppDispatch>();

  // Initialize state
  const {
    product,
    fetchProductStatus,
  } = useSelector<IViewSalesDataState, IProductSalesTableState>(state => ({
    product: state.data,
    fetchProductStatus: state.fetchProductStatus,
  }), shallowEqual);

  // Set pagination
  const [ pagination, setPagination ] = useState({
    pageSize: 10,
    page: 0,
  });

  // Set sorting
  const [ sorting, setSorting ] = useState<GridSortModel>([{
    field: 'weekEnding',
    sort: 'asc',
  }]);

  // The Data Grid component requires all rows to have a unique `id` property.
  const rows = useMemo(() => {
    return product.sales.data.map((row, idx) => {
      return Object.assign({ id: idx }, row);
    });
  }, [product]);

  // Update the filter if sorting or pagination changes. NOTE this should
  // trigger another API call in the parent component.
  useEffect(() => {
    const filter = new URLSearchParams({
      sortBy: sorting[0]?.field ?? 'weekEnding',
      sortDir: sorting[0]?.sort ?? 'asc',
      limit: String(pagination.pageSize),
      offset: String(pagination.pageSize * pagination.page),
    }).toString();
    dispatch(actions.setFilter(filter));
  }, [sorting, pagination, dispatch]);

  // Return
  return (
    <Box sx={{
      '& .MuiDataGrid-columnHeaderTitle': {
        textTransform: 'uppercase',
      },
    }}>
      <DataGrid
        rows={rows ?? []}
        loading={fetchProductStatus.isLoading}
        columns={[
          {
            field: 'weekEnding',
            headerName: 'Week Ending',
            flex: 1,
          },
          {
            field: 'retailSales',
            headerName: 'Retail Sales',
            flex: 1,
          },
          {
            field: 'wholesaleSales',
            headerName: 'Wholesale Sales',
            flex: 1,
          },
          {
            field: 'unitsSold',
            headerName: 'Units Sold',
            flex: 1,
          },
          {
            field: 'retailerMargin',
            headerName: 'Retailer margin',
            flex: 1,
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'rating', sort: 'desc' }],
          },
        }}
        sortingMode="server"
        paginationMode="server"
        rowCount={product.sales.meta.totalCount ?? 0}
        onPaginationModelChange={val => setPagination(val)}
        onSortModelChange={val => setSorting(val)}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        sx={{ border: 0 }}
      />
    </Box>
  );
}


// **** Export default **** //

export default ProductSalesTable;


