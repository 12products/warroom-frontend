import { Component } from 'solid-js'

import Nav from './PublicNav'

const PublicLayout: Component = ({ children }) => {
  return (
    <div class="p-5 md:py-10 space-y-60 relative overflow-x-hidden">
      <div class="max-w-7xl mx-auto">
        <Nav />
      </div>

      {children}
    </div>
  )
}

export default PublicLayout
