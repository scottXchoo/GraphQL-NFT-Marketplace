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
    nftId: ID!
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
    nftsByCollection(collectionId: ID!): [Nft!]!
    allCollections: [Collection!]!
    artCollection: [Collection!]!
    gamingCollection: [Collection!]!
    pfpCollection: [Collection!]!
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
      return allNfts.find((nft) => nft.nftId === nftId);
    },
    nftsByCollection(_, { collectionId }) {
      const nfts = allCollections.find(
        (collection) => collection.id === collectionId
      ).items;
      return nfts;
    },
    allCollections() {
      allCollections.sort((a, b) => b.totalVolume - a.totalVolume);
      return allCollections;
    },
    artCollection() {
      const artCollection = allCollections.filter(
        (collection) => collection.category === "art"
      );
      artCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return artCollection;
    },
    gamingCollection() {
      const gamingCollection = allCollections.filter(
        (collection) => collection.category === "gaming"
      );
      gamingCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return gamingCollection;
    },
    pfpCollection() {
      const pfpCollection = allCollections.filter(
        (collection) => collection.category === "pfp"
      );
      pfpCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return pfpCollection;
    },
  },

  Nft: {
    id({ nftId, collectionId }) {
      return `${collectionId}/${nftId}`;
    },
    owner({ ownerId }) {
      return allOwners.find((owner) => owner.id === ownerId);
    },
    collectionName({ collectionId }) {
      return allCollections.find((collection) => collection.id === collectionId)
        .name;
    },
    name({ collectionId, nftId }) {
      const name = allCollections.find(
        (collection) => collection.id === collectionId
      ).name;
      return `${name} #${nftId}`;
    },
  },
  Collection: {
    creator({ creatorId }) {
      return allOwners.find((owner) => owner.id === creatorId);
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
