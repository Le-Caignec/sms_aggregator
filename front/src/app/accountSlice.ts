import { createAsyncThunk, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IExec } from 'iexec'
import { api, getIexecAndRefresh } from './api'
import { initIExec } from '../utils/wallet'

export interface AccountState {
    iexec: IExec | null
    userAddress: string
    status: "Not Connected" | "Connected" | "loading" | "failed"
    error: string | null;
}

const initialState: AccountState = {
    iexec: null,
    userAddress: "",
    status: "Not Connected",
    error: null
}

export const connectAccount = createAsyncThunk("account/connect", async (_, { dispatch, getState }) => {
    const iexec = (await initIExec()) as IExec;
    const userAddress = await iexec.wallet.getAddress();

    let prevAddress = (getState() as RootState).account.userAddress as string;

    if (prevAddress.length > 0 && prevAddress.toLowerCase() !== userAddress.toLowerCase()) {
        dispatch(api.util.resetApiState());
    }

    return { iexec, userAddress: userAddress.toLowerCase() };
});

export const resetAccountSlice = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
    dispatch(api.util.resetApiState())
};


export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(connectAccount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(connectAccount.fulfilled, (state, action) => {
                state.status = "Connected";
                state.iexec = action.payload.iexec;
                state.userAddress = action.payload.userAddress;
            })
            .addCase(connectAccount.rejected, (state, action) => {
                state.status = "failed";
                state.error = "" + action.error.message;
            });
    },
})

export const selectthereIsSomeRequestPending = (state: RootState) =>
    Object.values(state.api.queries).some((query) => query?.status === "pending") ||
    Object.values(state.api.mutations).some((query) => query?.status === "pending");
export const selectAccountIexec = (state: RootState) => state.account.iexec;
export const selectAccountUserAddress = (state: RootState) => state.account.userAddress;
export const selectAccountStatus = (state: RootState) => state.account.status;
export const selectAccountError = (state: RootState) => state.account.error;
export default accountSlice.reducer;

export const accountApi = api.injectEndpoints({
    endpoints: (builder) => ({
        pushSecret: builder.mutation<
            { isPushed: boolean },
            { secretName: string; secretValue: string; address: string }
        >({
            queryFn: async (args, { getState }) => {
                try {
                    const iexec = await getIexecAndRefresh(getState());
                    let secretAlreadyExist = await iexec.secrets.checkRequesterSecretExists(args.address, args.secretName);
                    if (secretAlreadyExist) {
                        return { error: "Secret already exist" };
                    } else {
                        let result = await iexec.secrets.pushRequesterSecret(args.secretName, args.secretValue);
                        if (!result.isPushed) {
                            return { error: "Unable to push secret" };
                        } else {
                            return {
                                data: result,
                            };
                        }
                    }
                } catch (e) {
                    return { error: (e as Error).message || e };
                }
            },
        }),
    }),
})

export const {usePushSecretMutation } = accountApi;

