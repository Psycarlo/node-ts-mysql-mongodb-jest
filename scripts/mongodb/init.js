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

db.test.insertOne({ info: 'myTestInfo' })
