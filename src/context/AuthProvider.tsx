import { createContext, Component, onCleanup, Accessor } from 'solid-js'
import { createStore, Store } from 'solid-js/store'
import { User, Session } from '@supabase/supabase-js'

import { supabase } from '../lib/supabase'

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  session: Session | null
}

type AuthActions = {
  signIn: (user: User) => void
  signOut: () => void
}

type AuthStore = [Store<AuthState>, AuthActions]

const EMPTY_STATE = {
  user: null,
  isAuthenticated: false,
  session: null,
}

const [state, setState] = createStore<AuthState>(EMPTY_STATE)

const ACTIONS = {
  signIn: (user: User) => {
    setState({ user, isAuthenticated: true })
  },
  signOut: async () => {
    await supabase.auth.signOut()
    setState(EMPTY_STATE)
  },
}

const store: AuthStore = [state, ACTIONS]

export const AuthContext = createContext<AuthStore>([EMPTY_STATE, ACTIONS])

export const AuthProvider: Component = ({ children }) => {
  const { data: authListener, error } = supabase.auth.onAuthStateChange(
    (_, session) => {
      const user = session?.user || null
      setState({ session, user, isAuthenticated: !!session })
    }
  )

  if (error) {
    throw error
  }

  onCleanup(() => authListener?.unsubscribe())

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export default AuthProvider
