import { Component } from 'solid-js'

import Nav from './PublicNav'

const PublicLayout: Component = ({ children }) => {
  return (
    <div class="p-5 md:p-0 md:py-10 max-w-7xl mx-auto relative">
      <Nav />

      {children}
    </div>
  )
}

export default PublicLayout
