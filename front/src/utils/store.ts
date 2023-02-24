import { createSlice, configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

const forecastPronoSlice = createSlice({
    name: 'forecastProno',
    initialState: {
        prono: [],
    },
    reducers: {
        updateForecastProno: (state, action) => {
            state.prono = action.payload
        },
    },
})

export const store = configureStore({
    reducer: {
        forecastProno: forecastPronoSlice.reducer,
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