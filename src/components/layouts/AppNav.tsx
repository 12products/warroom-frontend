import { Component, useContext } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import Logo from '../Logo'
import Button from '../Button'
import { AuthContext } from '../../context/AuthProvider'

const Nav: Component = () => {
  const navigate = useNavigate()
  const [_, { signOut }] = useContext(AuthContext)

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <>
      <nav class="flex justify-between items-center mb-4">
        <Logo />

        <Button onClick={handleSignOut}>Sign Out</Button>
      </nav>
    </>
  )
}

export default Nav
