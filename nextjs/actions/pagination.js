import { useSWRInfinite } from 'swr';

import { fetcher } from 'actions';

export const useGetBlogsPages = ({ filter }) => {
  const getKey = (pageIndex, previousPageData) => {
    // first page, hence no previousPageData
    if (pageIndex === 0) {
      return `api/blogs?date=${filter.date.asc ? 'asc' : 'desc'}`;
    }

    // reached the end
    // if (!previousPageData.length) return null;
    if (previousPageData && !previousPageData.length) return null;

    // add cursor to API endpoint
    return `/api/blogs?offset=${pageIndex * 3}&date=${
      filter.date.asc ? 'asc' : 'desc'
    }`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  // check for end of results
  let endOfQuery = false;
  if (data) {
    endOfQuery = data && data[data?.length - 1].length === 0;
  }

  return { data, size, setSize, endOfQuery };
};
