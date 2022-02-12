import { Component, useContext } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import AppNav from './AppNav'
import { AuthContext } from '../../context/AuthProvider'

const AppLayout: Component = ({ children }) => {
  const [{ isAuthenticated }] = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/login')
  }

  return (
    <div class="p-5 md:p-0 md:py-10 max-w-7xl mx-auto relative">
      <AppNav />

      {children}
    </div>
  )
}

export default AppLayout
