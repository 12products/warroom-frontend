import type { Component } from 'solid-js'
import { useRoutes } from 'solid-app-router'

import { routes } from './routes'
import Nav from './components/Nav'

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <div class="p-5 md:p-0 md:py-10 max-w-7xl mx-auto relative">
      <Nav />

      <Routes />
    </div>
  )
}

export default App
