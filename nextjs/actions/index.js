import useSWR from 'swr';

export const fetcher = url => {
  return fetch(url).then(res => res.json());
};

// export const useGetHello = () => useSWR('/api/hello', fetcher);

export const useGetBlogs = initialData =>
  useSWR(`/api/blogs`, fetcher, { initialData });
