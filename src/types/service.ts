export type Service = {
  id: string
  name: string
  description: string
  private: boolean
  status: ServiceStatus
}

export enum ServiceStatus {
  OPERATIONAL = 'OPERATIONAL',
  PARTIAL_OUTAGE = 'PARTIAL_OUTAGE',
  MAJOR_OUTAGE = 'MAJOR_OUTAGE',
}
