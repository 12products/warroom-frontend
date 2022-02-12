import type { Component } from 'solid-js'
import { useRoutes } from 'solid-app-router'

import { routes } from './routes'
import { AuthProvider } from './context/AuthProvider'

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App
