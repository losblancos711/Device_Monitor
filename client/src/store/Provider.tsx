import React, { ReactNode, useCallback, useReducer } from "react";
import { Store } from "./store";
import {
  storeReducer,
  initialReducerState,
  StoreReducerActions,
} from "./reducer";

export const StoreProvider = (props: { children: ReactNode }) => {
  const [storeData, dispatchStoreData] = useReducer(
    storeReducer,
    initialReducerState
  );

  const setCurrentPageSize = useCallback((size: number) => {
    dispatchStoreData({
      type: StoreReducerActions.SET_CURRENT_PAGE_SIZE,
      data: size,
    });
  }, []);

  const upsertMetaData = useCallback((key: string, value: unknown) => {
    dispatchStoreData({
      type: StoreReducerActions.UPSERT_META_DATA,
      data: { key, value },
    });
  }, []);

  return (
    <Store.Provider
      value={{ ...storeData, setCurrentPageSize, upsertMetaData }}
    >
      {props.children}
    </Store.Provider>
  );
};
