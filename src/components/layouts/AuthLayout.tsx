import { Component } from 'solid-js'

import Logo from '../Logo'

const AuthLayout: Component = ({ children }) => {
  return (
    <div class="flex flex-col h-screen justify-center items-center">
      <Logo />

      <div class="mt-8 w-1/3">{children}</div>
    </div>
  )
}

export default AuthLayout
