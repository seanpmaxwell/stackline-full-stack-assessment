import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IViewSalesDataState } from './index.slice';


// **** Components **** //

/**
 * View primary information (i.e. Name/Description) for a product.
 */
function ProductOverview() {
  // Initialize data
  const {
    data: product,
  } = useSelector<IViewSalesDataState, IViewSalesDataState>(state => state);

  // State
  return (
    <Box>
      <Grid
        item={true}
        container={true}
        direction="column"
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        {/* Image */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}>
          <Box
            component="img"
            sx={{
              height: 233,
            }}
            alt="The house from the offer."
            src={product.image}
          />
        </Box>

        {/* Name */}
        <Box textAlign="center">
          <Typography variant="h5" component="h5">
            <b>{product.title}</b>
          </Typography>
        </Box>
      </Grid>


    </Box>
  );
}


// **** Export default **** //

export default ProductOverview;

