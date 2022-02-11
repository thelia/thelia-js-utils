import * as React from "react";

export const DataRouteContext = React.createContext({
  baseUrl: "",
});

export const DataRouteProvider = DataRouteContext.Provider;

export function useDataRoute() {}
