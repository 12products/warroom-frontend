export type Incident = {
  id: string
  title: string
  description: string
  status: IncidentStatus
  severity: IncidentSeverity
  date: Date
}

export enum IncidentStatus {
  INVESTIGATING,
  IDENTIFIED,
  MONITORING,
  RESOLVED,
}

export enum IncidentSeverity {
  CRITICAL,
  HIGH,
  MEDIUM,
  LOW,
}

export type IncidentPropertyOption = {
  id: string
  label: string
}

export type IncidentActionItem = {
  id: string
  text: string
}
