import testInitData from './testInitData'
import mySqlDbAccess from './lib/mysql'
// import mongoDbAccess from './lib/mongo'

afterAll(() => {
  mySqlDbAccess.close()
})

describe('Init Data', () => {
  it('should return mysql init data', async () => {
    const result = await testInitData.getMySQLInitData()
    expect(result).toEqual([{ id: 1, info: 'myTestInfo' }])
  })

  // it('should return mongodb init data', async () => {
  //   const result = await testInitData.getMongoDBInitData()
  //   console.log(result)
  //   expect(result).toBeTruthy()
  // })
})
