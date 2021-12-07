import testInitData from './testInitData'
// import mongoDbAccess from './lib/mongo'

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
