import { gql } from "@apollo/client";

export const ALL_COLLECTIONS = gql`
  query getCollections($collectionId: ID!) {
    nftsByCollection(collectionId: $collectionId) {
      id
      name
      image
    }
    allCollections {
      id
      name
      totalVolume
      floorPrice
      profileImage
    }
  }
`;
