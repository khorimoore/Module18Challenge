import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './schemas/resolvers';
import { authMiddleware } from './services/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    authMiddleware(req, {} as express.Response, () => {});
    return { user: req.user };
  }
});

// Apply Apollo Server as middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the server after Apollo is set up
  app.listen(PORT, () => {
    console.log(`🌍 Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});