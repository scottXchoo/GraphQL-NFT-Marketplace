import { gql } from "@apollo/client";

export const ALL_COLLECTIONS = gql`
  query getCollections($collectionId: ID!, $nftId: ID!) {
    nft(collectionId: $collectionId, nftId: $nftId) {
      id
      name
      image
    }
    allCollections {
      id
      name
      totalVolume
    }
  }
`;
