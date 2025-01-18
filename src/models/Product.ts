
// **** Types **** //

export interface IProduct {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  retailer: string;
  details: string[];
  tags: string[];
  sales: {
    meta: {
      totalCount: number;
      pageSize: number;
      offset: number;
    };
    data: ISalesDataItem[];
  };
  // "reviews" not fetched for this assessment
  // reviews: {
  //   meta: {
  //     totalCount: number;
  //     pageSize: number;
  //     offset: number;
  //   };
  //   data: ISalesDataItem[];
  // };
}

interface ISalesDataItem {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
  id?: number; // Required for datagrid component
}


// **** Functions **** //

/**
 * Placeholder for uninitialized data
 */
export function getBlankProduct(): IProduct {
  return {
    id: '',
    title: '',
    image: '',
    subtitle: '',
    brand: '',
    retailer: '',
    details: [],
    tags: [],
    sales: {
      meta: {
        totalCount: 0,
        pageSize: 0,
        offset: 0,
      },
      data: [],
    },
  };
}
