import { Component } from 'solid-js'

import AppLayout from '../../components/layouts/AppLayout'
import CreateIncidentForm from '../../components/CreateIncidentForm'

const CreateIncident: Component = () => {
  return (
    <AppLayout>
      <main class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50 w-1/2 mx-auto">
        <CreateIncidentForm />
      </main>
    </AppLayout>
  )
}

export default CreateIncident
