export type Event = {
  id: string
  text: string
  eventDate: string
}

export enum EventType {
  CAUSE = 'CAUSE',
  DETECTION = 'DETECTION',
  RESOLUTION = 'RESOLUTION',
  GENERIC = 'GENERIC',
}
