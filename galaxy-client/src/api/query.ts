import { gql } from "@apollo/client";

export const GET_QUERY = gql`
  query getQuery($collectionId: ID!, $chain: String!) {
    nftsByCollection(collectionId: $collectionId) {
      id
      name
      image
    }
    allCollections(chain: $chain) {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
    pfpCollection(chain: $chain) {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
    artCollection(chain: $chain) {
      id
      name
      totalVolume
      floorPrice
      profileImage
      createdAt
      category
    }
    gamingCollection(chain: $chain) {
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
