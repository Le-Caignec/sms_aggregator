import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { IExec } from "iexec";
import { RootState } from "./store";

const HTTPS_URL = "https://thegraph.bellecour.iex.ec/subgraphs/name/bellecour/sms-aggregator";

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