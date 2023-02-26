import { createSlice, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        iExec: null,
    },
    reducers: {
        updateIExecVar: (state, action) => {
            state.iExec = action.payload
        },
    },
})

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;