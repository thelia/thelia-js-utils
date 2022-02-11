import { Login } from "../../types";
import { fetcher } from "../../fetcher";

// LOGIN
export function login(data: Login) {
  return fetcher(`/login`, {
    method: "POST",
    data,
  });
}
