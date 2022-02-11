import { Address, Customer } from "../../types";

import { fetcher } from "../../fetcher";

// CUSTOMER
export function getCustomer() {
  return fetcher(`/customer`);
}

export function patchCustomer(data: { customer: Customer; password: string }) {
  return fetcher(`/customer`, {
    method: "PATCH",
    data,
  });
}

export function createCustomer(data: {
  customer: Customer;
  password: string;
  address: Address;
}) {
  return fetcher(`/customer`, {
    method: "POST",
    data,
  });
}
