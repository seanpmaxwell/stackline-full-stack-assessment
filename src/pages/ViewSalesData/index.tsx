import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ProductOverview from './ProductOverview';
import SalesLineGraph from './SalesLineGraph';
import ProductSalesTable from './ProductSalesTable';


// **** Components **** //

/**
 * View sales data for a company.
 */
function ViewSalesData() {
  return (
    <Box p={2}>
      <Grid 
        container={true}
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          pt: 4,
        }}
      >
        {/* Product Overview (Left Side) */}
        <Grid item={true} xs={3}>
          <Paper elevation={3}>
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
          <Grid>
            <Paper elevation={3}>
              <SalesLineGraph/>
            </Paper>
          </Grid>
          {/* Sales Table */}
          <Grid>
            <Paper elevation={3}>
              <ProductSalesTable/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}


// **** Export default **** //

export default ViewSalesData;
