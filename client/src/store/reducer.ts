export interface StoreReducerState {
  currentPageSize: number;
  meta?: Record<string, any>;
}

export enum StoreReducerActions {
  SET_CURRENT_PAGE_SIZE = "setCurrentPageSize",
  UPSERT_META_DATA = "upsertMetaData",
}

type Action =
  | { type: StoreReducerActions.SET_CURRENT_PAGE_SIZE; data: number }
  | {
      type: StoreReducerActions.UPSERT_META_DATA;
      data: { key: string; value: unknown };
    };

export const initialReducerState: StoreReducerState = {
  meta: {},
  currentPageSize: 5,
};

export const storeReducer = (state: StoreReducerState, action: Action) => {
  switch (action.type) {
    case StoreReducerActions.SET_CURRENT_PAGE_SIZE: {
      return {
        ...state,
        currentPageSize: action.data,
      };
    }
    case StoreReducerActions.UPSERT_META_DATA: {
      let meta = state.meta ?? {};
      meta[action.data.key] = action.data.value;
      return {
        ...state,
        meta,
      };
    }
  }
};
