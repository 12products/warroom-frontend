import { IncidentStatus } from './Incident'

export type StatusMessage = {
  id: string
  text: string
  status: IncidentStatus
  createdAt: Date
}
