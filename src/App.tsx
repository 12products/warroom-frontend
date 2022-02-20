import { Component } from 'solid-js'
import { useRoutes } from 'solid-app-router'
import { Provider as GraphQLProvider } from 'solid-urql'

import { routes } from './routes'
import { AuthProvider } from './context/AuthProvider'
import { client } from './lib/urql'

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <AuthProvider>
      <GraphQLProvider value={client}>
        <Routes />
      </GraphQLProvider>
    </AuthProvider>
  )
}

export default App
