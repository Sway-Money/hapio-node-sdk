export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export type HapioPagination<T> = {
  data: T[]
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: {
    currentPage: number
    from: number | null
    lastPage: number
    path: string
    perPage: number
    to: number | null
    total: number
  }
}

export type HapioProject = {
  createdAt: string
  enabled: boolean
  id: string
  name: string
  updatedAt: string | null
}

export type HapioLocation = {
  createdAt: string
  enabled: boolean
  id: string
  metadata: Record<string, any> | null
  name: string
  protectedMetadata: Record<string, any> | null
  resourceSelectionPriority: string[]
  resourceSelectionStrategy: 'randomize' | 'prioritize' | 'equalize'
  timeZone: string
  updatedAt: string | null
}

export type HapioResource = {
  createdAt: string
  enabled: boolean
  id: string
  maxSimultaneousBookings: number | null
  metadata: Record<string, any> | null
  name: string
  protectedMetadata: Record<string, any> | null
  updatedAt: string | null
}

export type HapioService = {
  bookableInterval: string | null
  bookingWindowEnd: string | null
  bookingWindowStart: string | null
  bufferTimeAfter: string | null
  bufferTimeBefore: string | null
  cancelationThreshold: string | null
  createdAt: string
  duration: string
  enabled: boolean
  id: string
  metadata: Record<string, any> | null
  name: string
  price: string | null
  protectedMetadata: Record<string, any> | null
  type: 'fixed' | 'flexible' | 'day'
  updatedAt: string | null
}

export type HapioBooking = {
  bufferEndsAt: string | null
  bufferStartsAt: string | null
  canceledAt: string | null
  createdAt: string
  endsAt: string
  finalizedAt: string | null
  id: string
  isCanceled: boolean
  isTemporary: boolean
  location: HapioLocation | null
  metadata: Record<string, any> | null
  price: string | null
  protectedMetadata: Record<string, any> | null
  resource: HapioResource | null
  service: HapioService | null
  startsAt: string
  updatedAt: string | null
}
