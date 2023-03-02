import { ApolloServer, gql } from "apollo-server";

const allNfts = [
  {
    id: "1",
    name: "NFT 1",
    description: "NFT 1 description",
    image: "https://picsum.photos/200",
    externalUrl: "https://picsum.photos/200",
    userId: "11",
    owner: {
      id: "1",
      name: "Owner 1",
      walletAddress: "0x123",
      profileImage: "https://picsum.photos/200",
    },
    collection: {
      name: "Collection 1",
      description: "Collection 1 description",
      image: "https://picsum.photos/200",
      creator: {
        id: "1",
        name: "Owner 1",
        walletAddress: "0x123",
        profileImage: "https://picsum.photos/200",
      },
    },
  },
  {
    id: "2",
    name: "NFT 2",
    description: "NFT 2 description",
    image: "https://picsum.photos/200",
    externalUrl: "https://picsum.photos/200",
    userId: "22",
    owner: {
      id: "1",
      name: "Owner 1",
      walletAddress: "0x123",
      profileImage: "https://picsum.photos/200",
    },
    collection: {
      name: "Collection 1",
      description: "Collection 1 description",
      image: "https://picsum.photos/200",
      creator: {
        id: "1",
        name: "Owner 1",
        walletAddress: "0x123",
        profileImage: "https://picsum.photos/200",
      },
    },
  },
];
const owner = [
  {
    id: "1",
    name: "Owner 1",
    walletAddress: "0x123",
    profileImage: "https://picsum.photos/200",
  },
];

const typeDefs = gql`
  type Owner {
    id: ID!
    name: String!
    walletAddress: String!
    profileImage: String!
    """
    FullName is a computed field that combines name and walletAddress fields of the Owner type.
    """
    fullName: String!
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
    allOwners: [Owner!]!
    allNfts: [Nft!]!
    nft(id: ID!): Nft!
  }
  type Mutation {
    createNft(
      name: String!
      description: String!
      image: String!
      externalUrl: String
      userId: String!
    ): Nft!
    deleteNft(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allOwners() {
      return owner;
    },
    allNfts() {
      return allNfts;
    },
    nft(_, { id }) {
      console.log(id);
      return allNfts.find((nft) => nft.id === id);
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
    deleteNft(_, { id }) {
      const findNft = allNfts.find((nft) => nft.id === Number(id));
      if (!findNft) return false;
      allNfts = allNfts.filter((nft) => nft.id !== Number(id));
      return true;
    },
  },
  Owner: {
    fullName({ name, walletAddress }) {
      return `${name} ${walletAddress}`;
    },
  },
  Nft: {
    owner({ userId }) {
      return owner.find((owner) => owner.id === userId);
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
