db.createUser({
  user: 'psycarlo',
  pwd: 'bitcoinislove',
  roles: [
    {
      role: 'readWrite',
      db: 'mongotests'
    }
  ]
})

db.createCollection('test')

db.test.createIndex({ info: 1 }, { name: 'idx_info' })

db.test.insert({ info: 'myTestInfo' })
