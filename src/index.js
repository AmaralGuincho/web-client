import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const {
  // REACT_APP_API,
  REACT_APP_SUBSCRIPTION_API
} = process.env

const subscriptionClient = new SubscriptionClient(REACT_APP_SUBSCRIPTION_API, {
  reconnect: true,
  timeout: 20000
})

const client = new ApolloClient({
  link: new WebSocketLink(subscriptionClient),
  cache: new InMemoryCache()
})

const targetDiv = document.querySelector('#root')

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  targetDiv
)

registerServiceWorker()
