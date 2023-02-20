import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Apollo Client
const client = new ApolloClient({
  uri: 'https://thegraph.bellecour.iex.ec/subgraphs/name/bellecour/erc721',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ScrollToTop />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
