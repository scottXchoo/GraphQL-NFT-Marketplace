import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Owner {
    id: ID!
    name: String!
    walletAddress: String!
    profileImage: String!
  }
  type Collection {
    name: String!
    description: String!
    image: String!
    creator: Owner!
  }
  type Nft {
    id: ID!
    name: String!
    description: String!
    image: String!
    externalUrl: String!
    owner: Owner!
    collection: Collection!
  }
  type Query {
    allNfts: [Nft!]!
    nft(id: ID!): Nft!
  }
  type Mutation {
    createNft(
      name: String!
      description: String!
      image: String!
      externalUrl: String
      owner: Owner!
    ): Nft!
    deleteNft(id: ID!): Boolean!
  }
`;
const server = new ApolloServer({
  typeDefs,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
