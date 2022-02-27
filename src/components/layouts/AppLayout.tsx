import { Component, useContext } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import AppNav from './AppNav'
import { AuthContext } from '../../context/AuthProvider'

const AppLayout: Component = ({ children }) => {
  const [{ isAuthenticated }] = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/signup')
  }

  return (
    <div class="p-5 max-w-7xl mx-auto relative min-h-screen">
      <AppNav />

      {children}
    </div>
  )
}

export default AppLayout
