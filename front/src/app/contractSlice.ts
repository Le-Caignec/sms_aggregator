import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract } from "ethers";
import { api } from './api'
import { initContract } from '../utils/wallet'
import { RootState } from "./store";
import { Secret } from '../pages/AddSecret'

export interface ContractState {
    contract: Contract | null
    status: "Not Connected" | "Connected" | "loading" | "failed"
    error: string | null
}

const initialContractState: ContractState = {
    contract: null,
    status: "Not Connected",
    error: null
}

export const connectContract = createAsyncThunk("contract/connect", async (_, { dispatch, getState }) => {
    const contract = (await initContract()) as Contract;
    return contract
});

export const contractSlice = createSlice({
    name: 'contract',
    initialState: initialContractState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(connectContract.pending, (state) => {
                state.status = "loading";
            })
            .addCase(connectContract.fulfilled, (state, action) => {
                state.status = "Connected";
                state.contract = action.payload.contract;
            })
            .addCase(connectContract.rejected, (state, action) => {
                state.status = "failed";
                state.error = "" + action.error.message;
            });
    },
})

export const selectthereIsSomeRequestPending = (state: RootState) =>
    Object.values(state.api.queries).some((query) => query?.status === "pending") ||
    Object.values(state.api.mutations).some((query) => query?.status === "pending");

export const selectContractStatus = (state: RootState) => state.contract.status;
export const selectContractError = (state: RootState) => state.contract.error;
export const selectContract = (state: RootState) => state.contract.contract;
export default contractSlice.reducer;

export const contractApi = api.injectEndpoints({
    endpoints: (builder) => ({
        pushSecretContract: builder.mutation<
            { tr: string },
            { secret: Secret }
        >({
            queryFn: async (args, { getState }) => {
                try {
                    const contract = selectContract(getState() as RootState);
                    console.log("contract", contract)
                    const tx = await contract?.addSecret(args.secret.secretName, args.secret.currentDate, args.secret.secretDescription);
                    const tr = await tx?.wait();
                    return { data: tx }
                } catch (e) {
                    return { error: (e as Error).message || e };
                }
            },
        }),
    }),
});

export const { usePushSecretContractMutation } = contractApi;