import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ProductOverview from './ProductOverview';
import SalesLineGraph from './SalesLineGraph';
import ProductSalesTable from './ProductSalesTable';

import { IState, actions, fetchProduct } from './index.slice';
import { AppDispatch } from '../../App';


// **** Components **** //

/**
 * View sales data for a company.
 */
function ViewSalesData() {
  const dispatch = useDispatch<AppDispatch>(),
    location = useLocation(),
    state = useSelector<IState, IState>(sliceState => sliceState);

  // Set the product id
  useEffect(() => {
    const arr = location.pathname.split('/'),
      id = arr[arr.length - 1];
    dispatch(actions.setProductId(id));
  }, [dispatch, location.pathname]);

  // Fetch the productId
  useEffect(() => {
    dispatch(fetchProduct({
      productId: state.productId,
      filter: state.filter,
    }));
  }, [dispatch, state.filter, state.productId]);
  
  // Return
  return (
    <Container maxWidth="xl">
      <Box my={8}/>
      <Grid 
        container={true}
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        {/* Product Overview (Left Side) */}
        <Grid item={true} xs={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ProductOverview/>
          </Paper>
        </Grid>

        {/* Line Chart and Table */}
        <Grid
          xs={9}
          item={true}
          container={true}
          direction="column"
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          {/* Line Graph */}
          <Grid sx={{ mb: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <SalesLineGraph/>
            </Paper>
          </Grid>
          {/* Sales Table */}
          <Grid>
            <Paper elevation={3} sx={{ p: 2 }}>
              <ProductSalesTable/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}


// **** Export default **** //

export default ViewSalesData;
