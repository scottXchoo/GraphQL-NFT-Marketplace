import { gql } from "@apollo/client";

export const GET_QUERY = gql`
  query getQuery($collectionId: ID!) {
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
      createdAt
      category
    }
    pfpCollection {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
    artCollection {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
    gamingCollection {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
  }
`;
