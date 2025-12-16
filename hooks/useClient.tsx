import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

type UseClientProps = {
  queryKey: string[];
  url: string;
  isPrivate?: boolean;
  params?: Record<string, any>;
  enabled?: boolean;
  initialData?: any;
};

const useClient = ({
  queryKey,
  url,
  isPrivate = false,
  params = {},
  enabled = true,
  initialData,
}: UseClientProps) => {
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();

  const query = useQuery({
    // include params in queryKey so it refetches automatically when params change
    queryKey: [...queryKey, { ...params }],
    queryFn: async () => {
      const res = await client.get(url, { params });
      return res.data; // keep .data here because axios returns { data, status, ... }
    },

    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    refetch: query.refetch,
  };
};

export default useClient;
