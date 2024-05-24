import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'

const PORT = process.env.PORT || 3500
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

server.start().then(res => {
  server.applyMiddleware({app});
  app.get('/', (req, res) => {
    res.send({hello: 'there!'})
  })
  app.listen(PORT, () =>
  console.log(`🏃 on' http://localhost:${PORT}/`))
})