import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useValueStore } from "@/providers/useState";
import { useAuth } from "./useAuth";
import { set } from "react-hook-form";

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
  isLogin = false,
}: {
  url: string;
  method?: Method;
  isPrivate?: boolean;
  invalidateKeys?: string[][];
  successMessage?: string;
  errorMessage?: string;
  redirectTo?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  isLogin?: boolean;
}) => {
  const queryClient = useQueryClient();
  const client = isPrivate ? useAxiosSecure() : useAxiosPublic();
  const { setUser } = useAuth();
  const { setResetToken ,setApiError} = useValueStore();

  const router = useRouter();
  return useMutation<T, any, Payload<V>>({
    mutationFn: async ({ data, config }) =>
      method === "delete"
        ? await client.delete(url, config)
        : await client[method](url, data, config),

    onSuccess: (data: any) => {
      toast.success((data as any)?.message || successMessage);

      if (isLogin) {
        setUser(data.user);
      }
      if (data.resetKey) {
        setResetToken(data.resetKey);
      }
      // ✅ Wrap key array in { queryKey: key }
      invalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
      if (redirectTo) router.push(redirectTo);
      setApiError("");

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
