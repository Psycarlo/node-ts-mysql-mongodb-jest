import { Request, Response } from 'express'
import userEndpoint from './user'
import mockRequest from '../__test__/fixtures/mockRequest'
import mockResponse from '../__test__/fixtures/mockResponse'

// Note: MySQL Test DB and MongoDB Test DB must be running on Docker

describe('User Endpoint', () => {
  describe('POST', () => {
    it('throws invalid request', async () => {
      const req1 = mockRequest({
        body: {}
      })
      const res1 = mockResponse()
      userEndpoint.post(req1, res1)
      expect(res1.status).toHaveBeenCalledWith(400)
      expect(res1.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
    })
  })

  describe('GET', () => {
    it('throws invalid request', () => {
      // TODO
      expect(2 + 2).toEqual(4)
    })
  })
})

// TODO: Error Testing
// TODO: MySQL Testing
// TODO: MongoDB Testing
// TODO: Jest Mocks - Mocks for zingle, stripe, etc.
// TODO: Others
