import express from "express";
import cors from "cors";
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema.js';

const port = process.env.PORT || 3500

const db = require('./db.js')

const app = express();
app.use(cors());

const hateoas = require('./hateoas.js');

hateoas(app, port, db);

// throttle between 50 and 250ms
const DELAY = 50;
const JITTER = 200;
app.use('*', (req, res, next) =>
  setTimeout(next, DELAY + Math.floor(Math.random() * Math.floor(JITTER))),
);

// REST route for authors
const authorRouter = express.Router();
app.use('/api/authors', authorRouter);

authorRouter.route('/').get((req, res) => res.json(db.getAuthors()));
authorRouter
  .route('/:authorId')
  .get((req, res) => res.json(db.getAuthor(req.params.authorId)));
authorRouter
  .route('/:authorId/books')
  .get((req, res) => res.json(db.getAuthorBooks(req.params.authorId)));
authorRouter.route('/').post((req, res) => res.json(db.createAuthor(req.body)));

// REST route for books
const bookRouter = express.Router();
app.use('/api/books', bookRouter);

bookRouter.route('/').get((req, res) => res.json(db.getBooks()));
bookRouter
  .route('/:bookId')
  .get((req, res) => res.json(db.getBook(req.params.bookId)));
bookRouter
  .route('/:bookId/author')
  .get((req, res) => res.json(db.getBookAuthor(req.params.bookId)));

const server = new ApolloServer({
  resolvers,
  tracing: (process.env.NODE_ENV = 'development'),
  typeDefs,
});

server.start().then(res => {
  server.applyMiddleware({app});
  app.listen(port, () =>
  console.log(`🏃‍♂️ on port http://localhost:${port}/`))
  // console.log('🏃 on', process.env.SANDBOX_URL || `http://localhost:${port}/`))
})

// server.applyMiddleware({ app });

// app.listen(port, () => {
//   console.log(`🏃‍♂️ on port ${port}`); 
// });

