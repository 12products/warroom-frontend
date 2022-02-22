import { Component, createSignal, Show, useContext } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import Logo from '../Logo'
import Button from '../Button'
import { AuthContext } from '../../context/AuthProvider'
import CreateIncidentModal from '../modals/CreateIncidentModal'

const Nav: Component = () => {
  const navigate = useNavigate()
  const [_, { signOut }] = useContext(AuthContext)

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  const [getShouldDisplay, setShouldDisplay] = createSignal(false)

  const handleCreateIncident = () => {
    setShouldDisplay(true)
  }

  return (
    <>
      <nav class="flex justify-between items-center mb-4">
        <Logo />
        <div class="space-x-4">
          <Button onClick={handleCreateIncident}>Create Incident</Button>

          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </nav>

      <CreateIncidentModal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
    </>
  )
}

export default Nav
