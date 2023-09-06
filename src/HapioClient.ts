import axios from 'axios'

import { HttpMethod, HapioBooking, HapioLocation, HapioPagination, HapioProject } from './types'
import { camelKeys } from './utils/dataTransformation'

export class HapioClient {
  apiToken: string | null = null
  apiVersion = 'v1'

  constructor(apiToken: string) {
    this.apiToken = apiToken
  }

  apiRequest = async<T>(
    method: HttpMethod,
    path: string,
  ) => {
    const res = await axios<T>({
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
      method,
      url: `https://eu-central-1.hapio.net/${this.apiVersion}${path}`,
    })

    return camelKeys(res.data) as T
  }

  bookings = {
    getBookings: () =>
      this.apiRequest<HapioPagination<HapioBooking>>('GET', '/bookings'),
  }

  projects = {
    getProject: () =>
      this.apiRequest<HapioProject>('GET', '/project'),
  }

  locations = {
    getLocation: (locationId: string) =>
      this.apiRequest<HapioLocation>('GET', `/locations/${locationId}`),

    getLocations: () =>
      this.apiRequest<HapioPagination<HapioLocation>>('GET', '/locations'),
  }
}
