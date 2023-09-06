import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { HapioClient } from './HapioClient'

const axiosMock = new MockAdapter(axios)
const apiToken = 'apiToken'

describe('HapioClient', () => {
  beforeEach(() => {
    axiosMock.resetHistory()
  })

  describe('apiRequest', () => {
    it('should call axios with the correct arguments', async () => {
      const hapioClient = new HapioClient(apiToken)
      const fullUrl = 'https://eu-central-1.hapio.net/v1/test'

      axiosMock.onGet(fullUrl).reply(200)

      await hapioClient.apiRequest('GET', '/test')

      expect(axiosMock.history.get).toHaveLength(1)
      expect(axiosMock.history.get[0].url).toBe(fullUrl)
      expect(axiosMock.history.get[0].headers?.Authorization).toBe(`Bearer ${apiToken}`)
    })

    it('should camel case the response data', async () => {
      const hapioClient = new HapioClient(apiToken)
      const fullUrl = 'https://eu-central-1.hapio.net/v1/test'

      axiosMock.onGet(fullUrl).reply(200, { snake_case: 'value' })

      const result = await hapioClient.apiRequest('GET', '/test')

      expect(result).toEqual({ snakeCase: 'value' })
    })
  })

  describe('bookings', () => {
    describe('getBookings', () => {
      it('should call apiRequest with the correct arguments', async () => {
        const hapioClient = new HapioClient(apiToken)

        jest.spyOn(hapioClient, 'apiRequest').mockResolvedValue(null as any)

        await hapioClient.bookings.getBookings()

        expect(hapioClient.apiRequest).toHaveBeenCalledTimes(1)
        expect(hapioClient.apiRequest).toHaveBeenCalledWith('GET', '/bookings')
      })
    })
  })

  describe('projects', () => {
    describe('getProject', () => {
      it('should call apiRequest with the correct arguments', async () => {
        const hapioClient = new HapioClient(apiToken)

        jest.spyOn(hapioClient, 'apiRequest').mockResolvedValue(null as any)

        await hapioClient.projects.getProject()

        expect(hapioClient.apiRequest).toHaveBeenCalledTimes(1)
        expect(hapioClient.apiRequest).toHaveBeenCalledWith('GET', '/project')
      })
    })
  })

  describe('locations', () => {
    describe('getLocation', () => {
      it('should call apiRequest with the correct arguments', async () => {
        const hapioClient = new HapioClient(apiToken)

        jest.spyOn(hapioClient, 'apiRequest').mockResolvedValue(null as any)

        await hapioClient.locations.getLocation('test-location-id')

        expect(hapioClient.apiRequest).toHaveBeenCalledTimes(1)
        expect(hapioClient.apiRequest).toHaveBeenCalledWith('GET', '/locations/test-location-id')
      })
    })

    describe('getLocations', () => {
      it('should call apiRequest with the correct arguments', async () => {
        const hapioClient = new HapioClient(apiToken)

        jest.spyOn(hapioClient, 'apiRequest').mockResolvedValue(null as any)

        await hapioClient.locations.getLocations()

        expect(hapioClient.apiRequest).toHaveBeenCalledTimes(1)
        expect(hapioClient.apiRequest).toHaveBeenCalledWith('GET', '/locations')
      })
    })
  })
})
