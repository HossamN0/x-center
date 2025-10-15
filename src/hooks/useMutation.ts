// hooks/useMutation.ts
import { Environment } from "@/constants/enum";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useMutationHook = <TData = unknown, TError = unknown, TVariables = void>(
    options: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> & {
        mutationFn: any;
    }
) => {
    return useMutation({
        onError: (error: TError) => {
            if (process.env.BACKEND_ENV === Environment.DEVELOPMENT) {
                console.log('Mutation error:', error);
            }
        },
        ...options
    });
};