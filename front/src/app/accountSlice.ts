import { PayloadAction, createAsyncThunk, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IExec } from 'iexec'
import { Contract } from 'ethers'
import { api, getIexecAndRefresh } from './api'
import { initIExec } from '../utils/wallet'

export interface AccountState {
    iexec: IExec | null
    contract: Contract | null
    userAddress: string
    status: "Not Connected" | "Connected" | "loading" | "failed"
    error: string | null;
}

const initialState: AccountState = {
    iexec: null,
    contract: null,
    userAddress: "",
    status: "Not Connected",
    error: null
}

export const connect = createAsyncThunk("account/connect", async (_, { dispatch, getState }) => {
    console.log("connect called")
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
    reducers: {
        updateContractVar: (state, action: PayloadAction<any>) => {
            state.contract = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connect.pending, (state) => {
                state.status = "loading";
            })
            .addCase(connect.fulfilled, (state, action) => {
                state.status = "Connected";
                state.iexec = action.payload.iexec;
                state.userAddress = action.payload.userAddress;
            })
            .addCase(connect.rejected, (state, action) => {
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
export const selectAccountContract = (state: RootState) => state.account.contract;
export const { updateContractVar } = accountSlice.actions;
export default accountSlice.reducer;

export const accountApi = api.injectEndpoints({
    endpoints: (builder) => ({
        pushSecret: builder.mutation<
            { isPushed: boolean },
            { secretName: string; secretValue: string }
        >({
            queryFn: async (args, { getState }) => {
                try {
                    const iexec = await getIexecAndRefresh(getState());
                    let result = await iexec.secrets.pushRequesterSecret(args.secretName, args.secretValue);
                    if (!result.isPushed) {
                        return { error: "Unable to push secret" };
                    } else {
                        return {
                            data: result,
                        };
                    }
                } catch (e) {
                    return { error: (e as Error).message || e };
                }
            },
        }),

        checkSecret: builder.mutation<
            boolean,
            { address: string; secretName: string }
        >({
            queryFn: async (args, { getState }) => {
                try {
                    const iexec = await getIexecAndRefresh(getState());
                    let result = await iexec.secrets.checkRequesterSecretExists(args.address, args.secretName);
                    return { data: result }
                } catch (e) {
                    return { error: (e as Error).message || e };
                }
            }

        }),
    }),
})

export const {
    usePushSecretMutation,
    useCheckSecretMutation,
} = accountApi;

