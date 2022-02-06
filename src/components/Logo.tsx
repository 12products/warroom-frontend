import type { Component } from 'solid-js'

const Logo: Component = () => {
  return (
    <div class="text-4xl no-underline font-bold uppercase flex items-center tracking-wider">
      <span class="text-white">war r</span>
      <div class="flex justify-center rounded bg-green-500 border-4 mx-1 border-green-500">
        <span class="bg-brand-black w-5 h-5 inline-block rounded relative"></span>
        <span class="bg-brand-black w-5 h-5 inline-block rounded relative"></span>
      </div>
      <span class="text-white">m</span>
    </div>
  )
}

export default Logo
