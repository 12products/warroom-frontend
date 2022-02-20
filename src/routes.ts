import { lazy } from 'solid-js'

export const routes = [
  { path: '/', component: lazy(() => import('./pages/home')) },
  { path: '/signin', component: lazy(() => import('./pages/signin')) },
  { path: '/signup', component: lazy(() => import('./pages/signup')) },
  // Authentication required for all routes below
  {
    path: '/incidents',
    children: [
      {
        path: '/',
        component: lazy(() => import('./pages/incidents')),
      },
      {
        path: '/assigned',
        component: lazy(() => import('./pages/incidents/assigned')),
      },
      {
        path: '/open',
        component: lazy(() => import('./pages/incidents/open')),
      },
    ],
  },
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
]
