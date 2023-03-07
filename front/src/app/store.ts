import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import accountReducer from './accountSlice'
import { api } from './api'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        account: accountReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["account/connect/fulfilled", "account/connect/rejected"],
                ignoredPaths: ["account.iexec"],
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