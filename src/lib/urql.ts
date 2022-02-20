import { useContext } from 'solid-js'
import { createClient } from 'solid-urql'

import { AuthContext } from '../context/AuthProvider'

export const client = createClient({
  url: 'http://localhost:3000/graphql',
  fetchOptions: () => {
    const [{ session }, _] = useContext(AuthContext)
    const token = session?.access_token || ''

    return {
      headers: { authorization: token.length ? `Bearer ${token}` : '' },
    }
  },
})
