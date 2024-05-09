import { createContext, useContext } from "react";

export interface ContextState {
  currentPageSize: number;
  meta?: Record<string, any>;
  setCurrentPageSize: (size: number) => void;
  upsertMetaData: (key: string, value: unknown) => void;
}

const initialContextState: ContextState = {
  currentPageSize: 5,
  setCurrentPageSize: () => undefined,
  upsertMetaData: () => undefined,
};

export const Store = createContext(initialContextState);
export const useStore = () => useContext(Store);
