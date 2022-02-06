import { Component } from 'solid-js'

import Logo from './Logo'

const Nav: Component = () => {
  return (
    <>
      <nav className="flex justify-between items-center">
        <Logo />

        <div className="bg-green-500 rounded px-4 py-1 font-bold uppercase">
          Coming Soon
        </div>
      </nav>
    </>
  )
}

export default Nav
