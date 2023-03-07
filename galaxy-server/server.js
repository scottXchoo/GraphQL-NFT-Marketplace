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
    totalVolume: String!
    floorPrice: String!
    items: [Nft!]!
    chain: String!
  }

  type Query {
    nftsByCollection(collectionId: ID!): [Nft!]!
    allCollections(chain: String!): [Collection!]!
    artCollection(chain: String!): [Collection!]!
    gamingCollection(chain: String!): [Collection!]!
    pfpCollection(chain: String!): [Collection!]!
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
    nftsByCollection(_, { collectionId }) {
      const nfts = allCollections.find(
        (collection) => collection.id === collectionId
      ).items;
      return nfts;
    },
    allCollections(_, { chain }) {
      const allCollection = allCollections.filter(
        (collection) => collection.chain === chain
      );
      allCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return allCollection;
    },
    artCollection(_, { chain }) {
      const artCollection = allCollections.filter(
        (collection) =>
          collection.category === "art" && collection.chain === chain
      );
      artCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return artCollection;
    },
    gamingCollection(_, { chain }) {
      const gamingCollection = allCollections.filter(
        (collection) =>
          collection.category === "gaming" && collection.chain === chain
      );
      gamingCollection.sort((a, b) => b.totalVolume - a.totalVolume);
      return gamingCollection;
    },
    pfpCollection(_, { chain }) {
      const pfpCollection = allCollections.filter(
        (collection) =>
          collection.category === "pfp" && collection.chain === chain
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
