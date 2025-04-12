import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";


const typeDefs = loadSchemaSync("./server/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const resolvers={
  Query:{
    greeting:()=> "Hello, world!",
  }
}
export const schema=makeExecutableSchema({
  typeDefs, 
  resolvers,
});
