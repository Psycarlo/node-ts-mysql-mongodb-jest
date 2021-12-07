import userEndpoint from './user'
import mockRequest from '../__test__/fixtures/mockRequest'
import mockResponse from '../__test__/fixtures/mockResponse'

import mySqlDbAccess from '../lib/mysql'
import mongoDbAccess from '../lib/mongo'

// Note: MySQL Test DB and MongoDB Test DB must be running on Docker

// Setup and Teardown
beforeAll(() => null)
afterAll(async () => {
  mySqlDbAccess.close()
  await mongoDbAccess.closeConnection()
})
beforeEach(() => null)
afterEach(() => null)

describe('User Endpoint', () => {
  describe('POST', () => {
    it('throws invalid request', async () => {
      // Requires username, email, hasBitcoin
      const req1 = mockRequest({
        body: {}
      }) // Arrange
      const res1 = mockResponse() // Arrange
      await userEndpoint.post(req1, res1) // Act
      expect(res1.status).toHaveBeenCalledWith(400) // Assert
      expect(res1.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      }) // Assert
      // Requires email, hasBitcoin
      const req2 = mockRequest({
        body: { username: 'test' }
      })
      const res2 = mockResponse()
      await userEndpoint.post(req2, res2)
      expect(res2.status).toHaveBeenCalledWith(400)
      expect(res2.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
      // Requires username, hasBitcoin
      const req3 = mockRequest({
        body: { email: 'test@gmail.com' }
      })
      const res3 = mockResponse()
      await userEndpoint.post(req3, res3)
      expect(res3.status).toHaveBeenCalledWith(400)
      expect(res3.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
      // Requires username, email
      const req4 = mockRequest({
        body: { hasBitcoin: true }
      })
      const res4 = mockResponse()
      await userEndpoint.post(req4, res4)
      expect(res4.status).toHaveBeenCalledWith(400)
      expect(res4.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
      // Requires username
      const req5 = mockRequest({
        body: { email: 'test@gmail.com', hasBitcoin: true }
      })
      const res5 = mockResponse()
      await userEndpoint.post(req5, res5)
      expect(res5.status).toHaveBeenCalledWith(400)
      expect(res5.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
      // Requires email
      const req6 = mockRequest({
        body: { username: 'test', hasBitcoin: true }
      })
      const res6 = mockResponse()
      await userEndpoint.post(req6, res6)
      expect(res6.status).toHaveBeenCalledWith(400)
      expect(res6.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
      // Requires hasBitcoin
      const req7 = mockRequest({
        body: { username: 'test', email: 'test@gmail.com' }
      })
      const res7 = mockResponse()
      await userEndpoint.post(req7, res7)
      expect(res7.status).toHaveBeenCalledWith(400)
      expect(res7.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot create user without required arguments'
      })
    })

    it('should post a user', async () => {
      const req = mockRequest({
        body: { username: 'test', email: 'test@gmail.com', hasBitcoin: true }
      })
      const res = mockResponse()
      await userEndpoint.post(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(1)
    })
  })

  describe('GET', () => {
    it('throws invalid request', async () => {
      const req = mockRequest({
        params: {},
        body: {}
      })
      const res = mockResponse()
      await userEndpoint.getOne(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid Request. User id is required'
      })
    })

    it('should get a user', async () => {
      // NOTE: This is calling other use case (post user) to test get user
      // We might not want to do this. Instead just use the dbAccess functions to do this
      const reqPost = mockRequest({
        body: { username: 'test', email: 'test@gmail.com', hasBitcoin: true }
      })
      const resPost = mockResponse()
      await userEndpoint.post(reqPost, resPost)

      const insertedId = resPost.json.mock.calls[0][0]
      const req = mockRequest({
        params: { id: insertedId },
        body: {}
      })
      const res = mockResponse()
      await userEndpoint.getOne(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        id: insertedId,
        username: 'test',
        email: 'test@gmail.com',
        hasBitcoin: true
      })
    })

    it('cannot find user info', async () => {
      const req = mockRequest({
        params: { id: '-1' },
        body: {}
      })
      const res = mockResponse()
      await userEndpoint.getOne(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error fetching user info from the database'
      })
    })
  })

  describe('PATCH', () => {
    it('throws invalid request', async () => {
      const req1 = mockRequest({
        params: {},
        body: {}
      })
      const res1 = mockResponse()
      await userEndpoint.patch(req1, res1)
      expect(res1.status).toHaveBeenCalledWith(400)
      expect(res1.json).toHaveBeenCalledWith({
        error: 'Invalid Request. User id is required'
      })
      const req2 = mockRequest({
        params: { id: 1 },
        body: {}
      })
      const res2 = mockResponse()
      await userEndpoint.patch(req2, res2)
      expect(res2.status).toHaveBeenCalledWith(400)
      expect(res2.json).toHaveBeenCalledWith({
        error: 'Invalid Request. Cannot update user without required arguments'
      })
    })
  })
})
