
// **** Types **** //

type TDataItem = Record<string, unknown>;

interface IFilteredData<T> {
  meta: {
    totalCount: number;
    pageSize: number;
    offset: number;
  };
  data: T;
}


// **** Functions **** //

/**
 * Apply a string filter to an array of 
 */
export function applyFilterToDummyData<T extends TDataItem[]>(
  data: T,
  filterStr: string,
): IFilteredData<T> {
  // Parse filter string
  const filter = Object.fromEntries(new URLSearchParams(filterStr));
  // Filter the data

  // pick up here
  console.log(filterStr)

    // pick up here
  const filteredData = data


  // Return
  return {
    meta: {
      totalCount: data.length,
      pageSize: Number(filter.pageSize),
      offset: Number(filter.pageSize),
    },
    data: filteredData,
  };
}
