import { ApolloServer, gql } from "apollo-server";
import { allCollections, allOwners } from "./database/db.js";

const typeDefs = gql`
  type Owner {
    id: ID!
    name: String!
    address: String!
    alias: String
  }
  type Nft {
    id: ID!
    ownerId: ID!
    collectionId: ID!
    name: String!
    image: String!
    owner: Owner!
    collectionName: String!
  }
  type Collection {
    id: ID!
    creatorId: ID!
    name: String!
    profileImage: String!
    coverImage: String!
    category: String!
    creator: Owner!
    itemNumber: Int!
    createdAt: String!
    description: String!
    totalVolume: Int!
    floorPrice: String!
    items: [Nft!]!
  }

  type Query {
    nft(collectionId: ID!, nftId: ID!): Nft!
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
    nft(_, { collectionId, nftId }) {
      const allNfts = allCollections.find(
        (collection) => collection.id === collectionId
      ).items;
      return allNfts.find((nft) => nft.id === nftId);
    },
    allCollections() {
      allCollections.sort((a, b) => b.totalVolume - a.totalVolume);
      return allCollections;
    },
    artCollection(_, { category }) {
      const artCollection = allCollections.filter(
        (collection) => collection.category === category
      );
      artCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return artCollection;
    },
    gamingCollection(_, { category }) {
      const gamingCollection = allCollections.filter(
        (collection) => collection.category === category
      );
      gamingCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return gamingCollection;
    },
    pfpsCollection(_, { category }) {
      const pfpsCollection = allCollections.filter(
        (collection) => collection.category === category
      );
      pfpsCollection.sort((a, b) => a.totalVolume - b.totalVolume);
      return pfpsCollection;
    },
  },

  Nft: {
    owner({ ownerId }) {
      return allOwners.find((owner) => owner.id === ownerId);
    },
    collectionName({ collectionId }) {
      return allCollections.find((collection) => collection.id === collectionId)
        .name;
    },
    name({ collectionId, id }) {
      const name = allCollections.find(
        (collection) => collection.id === collectionId
      ).name;
      return `${name} #${id}`;
    },
  },
  Collection: {
    creator({ creatorId }) {
      return allOwners.find((owner) => owner.id === creatorId);
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
