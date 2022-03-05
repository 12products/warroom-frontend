import { Component } from 'solid-js'
import { useRoutes } from 'solid-app-router'
import { Provider as GraphQLProvider } from 'solid-urql'

import { routes } from './routes'
import { AuthProvider } from './context/AuthProvider'
import { client } from './lib/urql'
import { WarRoomProvider } from './context/WarRoomProvider'

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <AuthProvider>
      <GraphQLProvider value={client}>
        <WarRoomProvider>
          <Routes />
        </WarRoomProvider>
      </GraphQLProvider>
    </AuthProvider>
  )
}

export default App
