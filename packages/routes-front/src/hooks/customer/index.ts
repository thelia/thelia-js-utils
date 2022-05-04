import { Address, Customer } from "../../types";
import {
  createCustomer,
  getCustomer,
  patchCustomer,
} from "../../routes/customer";
import { useMutation, useQuery } from "react-query";

import { queryClient } from "../../queryClient";

// CUSTOMER
export function useCustomer({ enabled = false }) {
  return useQuery("customer", () => getCustomer(), {
    enabled,
  });
}

export function useCustomerUpdate() {
  return useMutation(
    (data: { customer: Customer; password: string }) => patchCustomer(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customer");
      },
    }
  );
}

export function useCustomerCreate() {
  return useMutation(
    (data: { customer: Customer; password: string; address: Address }) =>
      createCustomer(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customer");
      },
    }
  );
}
