import { useSelector, shallowEqual } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IViewSalesDataState } from './index.slice';
import { IProduct } from '../../models/Product';
import Colors from '../../styles/Colors';


// **** Types **** //

interface IProductOverviewState {
  product: IProduct;
}


// **** Components **** //

/**
 * View primary information (i.e. Name/Description) for a product.
 */
function ProductOverview() {

  // Initialize state
  const {
    product,
  } = useSelector<IViewSalesDataState, IProductOverviewState>(state => ({
    product: state.data,
  }), shallowEqual);

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
          p: 2,
        }}>
          <img
            style={{
              height: 233,
            }}
            alt="The house from the offer."
            src={product.image || undefined}
          />
        </Box>

        {/* Name */}
        <Box sx={{
          textAlign: 'center',
          mb: 1,
        }}>
          <Typography variant="h5" component="h5">
            <b>{product.title}</b>
          </Typography>
        </Box>

        {/* Subtitle */}
        <Box sx={{
          textAlign: 'center',
          color: Colors.subtitle,
          width: '80%',
          margin: '0 auto',
          mb: 2,
        }}>
          <Typography variant="subtitle2">
            {product.subtitle}
          </Typography>
        </Box>

        {/* Tags */}
        <Box sx={{
          borderTop: `1px solid ${Colors.overviewDivider}`,
          borderBottom: `1px solid ${Colors.overviewDivider}`,
          px: 2, py: 1,
        }}>
          <Grid
            container={true}
            direction="row"
          >
            {product.tags.map(tag => (
              <Box mx={1} my={.5}>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap',
                    letterSpacing: 1,
                    border: `1px solid ${Colors.buttonBorder}`, 
                    color: Colors.buttonColor,
                  }}
                >
                  {tag}
                </Button>
              </Box>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}


// **** Export default **** //

export default ProductOverview;

