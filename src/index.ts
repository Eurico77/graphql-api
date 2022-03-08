import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/users/graphql/resolvers/user-resolver';
import { connect } from './config/database';


async function init() {
  await connect()
  const app = express();
  const port = process.env.PORT || 4010;

  const schema = await buildSchema({
    resolvers: [UserResolver],
  })

  const apoloServer = new ApolloServer({
    schema,
  });
  
  await apoloServer.start();
  apoloServer.applyMiddleware({ app });
  app.listen(port, () => console.log(`Server started on port ${port}`));
}
init();