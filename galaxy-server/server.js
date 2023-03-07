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
      return allNfts.find((nft) => nft.id === nftId);
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
