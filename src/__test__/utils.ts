
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
  const filter = Object.fromEntries(new URLSearchParams(filterStr)),
    { sortBy, sortDir } = filter,
    offset = Number(filter.offset),
    limit = Number(filter.limit);
  let filteredData = [ ...data ];
  // Sort the array
  if (!!sortBy) {
    const col = sortBy,
      dir = sortDir ?? 'asc';
    filteredData = data.sort((a, b) => {
      let aVal = a[col], bVal = b[col];
      if (dir === 'desc') {
        aVal = b[col];
        bVal = a[col];
      }
      return String(aVal).localeCompare(String(bVal));
    });
  }
  // Return
  return {
    meta: {
      totalCount: data.length,
      pageSize: Number(filter.pageSize),
      offset: Number(filter.pageSize),
    },
    data: filteredData.slice(offset, offset + limit) as T,
  };
}
