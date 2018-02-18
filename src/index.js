import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import 'typeface-roboto-slab'
import moment from 'moment'
import 'moment/locale/pt-br'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

moment.locale('pt-br')

const {
  REACT_APP_API,
  REACT_APP_SUBSCRIPTION_API
} = process.env

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  new WebSocketLink({
    uri: REACT_APP_SUBSCRIPTION_API,
    options: {
      reconnect: true
    }
  }),
  new HttpLink({ uri: REACT_APP_API })
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development'
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
