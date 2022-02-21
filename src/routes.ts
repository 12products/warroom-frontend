import { RouteDefinition } from 'solid-app-router'
import { lazy } from 'solid-js'

export const routes: RouteDefinition[] = [
  { path: '/', component: lazy(() => import('./pages/home')) },
  { path: '/signin', component: lazy(() => import('./pages/signin')) },
  { path: '/signup', component: lazy(() => import('./pages/signup')) },
  // Authentication required for all routes below
  {
    path: '/onboard',
    component: lazy(() => import('./pages/onboard')),
  },
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
      {
        path: '/service/:id',
        component: lazy(() => import('./pages/incidents/service')),
      },
      {
        path: '/create',
        component: lazy(() => import('./pages/incidents/create')),
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
      {
        path: '/:section',
        component: lazy(() => import('./pages/incidents/[id]')),
      },
    ],
  },
  {
    path: '/services',
    children: [
      {
        path: '/',
        component: lazy(() => import('./pages/services')),
      },
      {
        path: '/create',
        component: lazy(() => import('./pages/services/create')),
      },
    ],
  },
]
