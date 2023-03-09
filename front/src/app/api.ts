import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { IExec } from "iexec";
import { RootState } from "./store";

const HTTPS_URL = "http://127.0.0.1:8000/subgraphs/name/SMS_Aggregator";

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: HTTPS_URL,
  }),
  tagTypes: ["ACCOUNT_BALANCES", "REQUEST_ORDERS"],
  
  endpoints: (builder) => ({}),
});

export const getIexecAndRefresh = async (state: any): Promise<IExec> => {
  const rootState = state as RootState;
  const iexec = rootState.account.iexec;
  if (iexec) {
    const account = await iexec.wallet.getAddress();
    await checkStorageToken(iexec, account);
    return iexec;
  }
  throw new Error("Please connect Metamask Bellecour network");
};

async function checkStorageToken(iexec: IExec, account: string) {
  if (!(await iexec.storage.checkStorageTokenExists(account))) {
    const defaultStorageToken = await iexec.storage.defaultStorageLogin();
    const { isPushed } = await iexec.storage.pushStorageToken(defaultStorageToken);
    if (!isPushed) {
      throw new Error("Unable to initialize IPFS storage for results");
    }
  }
}