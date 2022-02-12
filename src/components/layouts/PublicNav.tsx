import { Component } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import Logo from '../Logo'
import Button from '../Button'

const Nav: Component = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav class="flex justify-between items-center">
        <Logo />

        <Button onClick={() => navigate('/login')}>Log In</Button>
      </nav>
    </>
  )
}

export default Nav
