import { useContext } from 'solid-js'
import { createClient } from 'solid-urql'
const { GQL_URL } = import.meta.env

import { AuthContext } from '../context/AuthProvider'

export const client = createClient({
  url: GQL_URL,
  fetchOptions: () => {
    const [{ session }, _] = useContext(AuthContext)
    const token = session?.access_token || ''

    return {
      headers: { authorization: token.length ? `Bearer ${token}` : '' },
    }
  },
})
