import type { Component } from 'solid-js'

import './index.css'
import logo from './logo.svg'

const App: Component = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p class="text-red-600">
          Edit <code class="text-red-600">src/App.tsx</code> and save to reload.
        </p>
        <a
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid HELLO WORLD
        </a>
      </header>
    </div>
  )
}

export default App
