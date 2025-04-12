import express from 'express';
import http from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { schema } from './schema.mjs';
import dotenv from 'dotenv';
import domain from './routes/index.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// GraphQL endpoint
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      req,
    }),
  }),
);


// REST Endpoints
app.use(domain);


// Listen to the server and log the correct port
await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));
console.log(`🚀 Apollo Server ready at http://localhost:${PORT}`);

// Graceful shutdown handling
const shutdown = async () => {
  console.log('Shutting down server...');
  await server.stop();
  httpServer.close(() => {
    console.log('Server closed');
  });
};

// Catch termination signals to gracefully shut down
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

