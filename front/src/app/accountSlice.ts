import { createAsyncThunk, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IExec } from 'iexec'
import { api, getIexecAndRefresh } from './api'
import { initIExec } from '../utils/wallet'
import { gql } from "graphql-request";
import { Person } from "../generated/graphql";
import { queryFromSubscription, handleWss, WSS_URL } from "../utils/gqlSubscriptions";

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
            { secretName: String; secretValue: String; address: string }
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
        checkSecret: builder.mutation<
            boolean,
            { secretName: String; address: string }
        >({
            queryFn: async (args, { getState }) => {
                try {
                    const iexec = await getIexecAndRefresh(getState());
                    let secretAlreadyExist = await iexec.secrets.checkRequesterSecretExists(args.address, args.secretName);
                    return {
                        data: secretAlreadyExist,
                    };
                } catch (e) {
                    return { error: (e as Error).message || e };
                }
            },
        }),
        getSecrets: builder.query<{ person: Person }, { walletAddress: string }>({
            query: (args) => ({
                document: queryFromSubscription(GetSecrets),
                variables: args,
            }), onCacheEntryAdded: async (
                requester,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) => {
                await handleWss(
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    WSS_URL,
                    GetSecrets,
                    { requester },
                    (data: any) => {
                        updateCachedData((draft) => {
                            if (data as { person: Person }) {
                                draft.person = data.person;
                            }
                        });
                    }
                );
            },
        }),
    }),
})

const GetSecrets = gql`
subscription MySecret($walletAddress: String!) {
    person(id: $walletAddress) {
      secrets(orderDirection: asc, orderBy: date) {
        description
        id
        key
        date
      }
    }
  }
`

export const { usePushSecretMutation, useLazyGetSecretsQuery, useCheckSecretMutation } = accountApi;

