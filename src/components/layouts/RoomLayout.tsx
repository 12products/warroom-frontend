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
    <div>
      <div class="p-5 pb-0 max-w-7xl mx-auto relative">
        <AppNav />
      </div>

      {children}
    </div>
  )
}

export default AppLayout
