import { lazy } from 'solid-js'

export const routes = [
  { path: '/', component: lazy(() => import('./pages/home')) },
  { path: '/signin', component: lazy(() => import('./pages/signin')) },
  { path: '/signup', component: lazy(() => import('./pages/signup')) },
  // Authentication required for all routes below
  {
    path: '/incidents/:id',
    children: [
      {
        path: '/',
        component: lazy(() => import('./pages/incidents/[id]')),
      },
      {
        path: '/room',
        component: lazy(() => import('./pages/incidents/[id]/room')),
      },
    ],
  },
  { path: '/dashboard', component: lazy(() => import('./pages/dashboard')) },
]
