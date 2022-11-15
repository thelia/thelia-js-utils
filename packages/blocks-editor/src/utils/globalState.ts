import { createGlobalState } from "react-use";

export const useGlobalHasChanged = createGlobalState<boolean>(false);
