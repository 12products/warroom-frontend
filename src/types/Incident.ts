export type Incident = {
  id: string
  title: string
  description: string
  status: IncidentStatus
  severity: IncidentSeverity
  incidentDate: Date
}

export enum IncidentStatus {
  INVESTIGATING = 'INVESTIGATING',
  IDENTIFIED = 'IDENTIFIED',
  MONITORING = 'MONITORING',
  RESOLVED = 'RESOLVED',
}

export enum IncidentSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type IncidentActionItem = {
  id: string
  text: string
}
