import { ApolloServer, gql } from "apollo-server";
import { allCollection } from "./database/db";

const typeDefs = gql`
  type Owner {
    id: ID!
    name: String!
    address: String!
    profileImage: String!
    coverImage: String!
  }
  type Nft {
    id: ID!
    name: String!
    image: String!
    owner: Owner!
    collection: Collection!
  }
  type Collection {
    id: ID!
    name: String!
    profileImage: String!
    coverImage: String!
    category: String!
    creator: Owner!
    itemNumber: Int!
    createdAt: String!
    description: String!
    totalVolume: Int!
    floorPrice: Int!
    items: [Nft!]!
  }

  type Query {
    allCollections: [Collection!]!
    artCollection(category: String!): [Collection!]!
    gamingCollection(category: String!): [Collection!]!
    pfpsCollection(category: String!): [Collection!]!
  }
  type Mutation {
    createNft(
      name: String!
      description: String!
      image: String!
      externalUrl: String
      userId: String!
    ): Nft!
  }
`;

const resolvers = {
  Query: {
    allCollections() {
      allCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return allCollection;
    },
    artCollection(_, { category }) {
      const artCollection = allCollection.filter(
        (collection) => collection.category === category
      );
      artCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return artCollection;
    },
    gamingCollection(_, { category }) {
      const gamingCollection = allCollection.filter(
        (collection) => collection.category === category
      );
      gamingCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return gamingCollection;
    },
    pfpsCollection(_, { category }) {
      const pfpsCollection = allCollection.filter(
        (collection) => collection.category === category
      );
      pfpsCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return pfpsCollection;
    },
  },

  Mutation: {
    createNft(_, { name, description, image, externalUrl, userId }) {
      const newNft = {
        id: allNfts.length + 1,
        name,
        description,
        image,
        externalUrl,
        userId,
      };
      allNfts.push(newNft);
      return newNft;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
