import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useValueStore } from "@/providers/useState";

type Method = "post" | "put" | "delete" | "patch";

type Payload<T> = {
  data?: T;
  config?: AxiosRequestConfig;
};
const { apiError, setApiError } = useValueStore.getState();



const useMutationClient = <T = any, V = any>({
  url,
  method = "post",
  isPrivate = false,
  invalidateKeys = [],
  successMessage = "Success",
  errorMessage,
  redirectTo,
  onSuccess,
  onError,
}: {
  url: string;
  method?: Method;
  isPrivate?: boolean;
  invalidateKeys?: string[][];
  successMessage?: string;
  errorMessage?: string;
  redirectTo?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();
const router = useRouter();
  return useMutation<T, any, Payload<V>>({
    mutationFn: async ({ data, config }) =>
      method === "delete"
        ? (await client.delete(url, config)).data
        : (await client[method](url, data, config)).data,

    onSuccess: (data) => {
      toast.success((data as any)?.message || successMessage);

      // ✅ Wrap key array in { queryKey: key }
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      if (redirectTo) router.push(redirectTo);

      onSuccess?.(data);
    },

    onError: (error: any) => {
      //   toast.error(error?.response?.data?.message || error.message || "Error");
      setApiError(error?.response?.data?.message || error.message || "Error");
      onError?.(error);
    },
  });
};

export default useMutationClient;
{
  /* const deleteUser = useMutationClient({
  url: `/users/${id}`,
  method: "delete",
  isPrivate: true,
  invalidateKeys: [["users"]], // array of query keys
  successMessage: "User deleted!",
});

deleteUser.mutate({}); */
}
