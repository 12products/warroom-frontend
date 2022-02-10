import { lazy } from 'solid-js'

export const routes = [
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
  { path: '/', component: lazy(() => import('./pages/home')) },
]
