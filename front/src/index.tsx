import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { bellecour } from './utils/wallet'
import React from 'react'
import { store } from './utils/store'
import { Provider } from 'react-redux'

// Wagmi Client
const { provider, webSocketProvider } = configureChains(
  [bellecour],
  [publicProvider()],
)

const clientWagmi = createClient({
  provider,
  webSocketProvider,
})

// Apollo Client
const clientApollo = new ApolloClient({
  uri: 'https://thegraph.bellecour.iex.ec/subgraphs/name/bellecour/erc721',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={clientApollo}>
          <WagmiConfig client={clientWagmi}>
            <ScrollToTop />
            <App />
          </WagmiConfig>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
)
