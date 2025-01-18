import { IProduct } from '../models/Product';

import SalesData from './stackline_frontend_assessment_data_2021.json';
import { applyFilterToDummyData } from './utils';


// **** Functions **** //

/**
 * Mock a backend API for fetching the sales data. 
 */
function fetchProductMock(
  productId: string,
  filter: string,
): Promise<IProduct> {
  return new Promise((res, rej) => {
    return setTimeout(() => {
      try {
        const resp = _fetchProductMockHelper(productId, filter);
        return res(resp);
      } catch (err) {
        rej(err);
      }
    }, 500);
  });
}

/**
 * Fetch product and apply filter.
 */
function _fetchProductMockHelper(
  productId: string,
  filter: string,
): IProduct {
  for (const product of SalesData) {
    if (product.id === productId) {
      const { sales, reviews, ...other } = product;
      return {
        ...other,
        sales: applyFilterToDummyData(sales, filter),
      };
    }
  }
  throw new Error('Product Not Found');
}


// **** Export Default **** //

export default fetchProductMock;
