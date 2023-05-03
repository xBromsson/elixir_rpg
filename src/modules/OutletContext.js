// outletContext.js
import { createContext, useContext } from "react";

const OutletContext = createContext();

export const useOutletContext = () => {
  return useContext(OutletContext);
};

export const OutletDataProvider = OutletContext.Provider;
