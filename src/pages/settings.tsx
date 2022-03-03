import { Component } from 'solid-js'
import UpdateUserForm from '../components/forms/UpdateUserForm'

import AppLayout from '../components/layouts/AppLayout'

const Services: Component = () => {
  return (
    <AppLayout>
      <main class="space-y-8 max-w-xl mx-auto">
        <section class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50">
          <UpdateUserForm />
        </section>
      </main>
    </AppLayout>
  )
}

export default Services
