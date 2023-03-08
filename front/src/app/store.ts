import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountReducer from './accountSlice'
import { api } from './api'
import contractReducer from './contractSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        account: accountReducer,
        contract : contractReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["account/connect/fulfilled", "account/connect/rejected", "contract/connect/fulfilled", "contract/connect/rejected"],
                ignoredPaths: ["account.iexec", "contract.contract"],
            },
        }).concat(api.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;