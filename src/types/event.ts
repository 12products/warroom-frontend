export type Event = {
  id: string
  text: string
  createdAt: string
}

export enum EventType {
  CAUSE = 'CAUSE',
  DETECTION = 'DETECTION',
  RESOLUTION = 'RESOLUTION',
  GENERIC = 'GENERIC',
}
