export const allOwners = [
  {
    id: "1",
    name: "Owner 1",
    address: "0x123",
    profileImage: "https://picsum.photos/200",
    coverImage: "https://picsum.photos/200",
  },
];

export const allCollections = [
  {
    id: "1",
    name: "ape name toto",
    profileImage: "https://picsum.photos/200",
    coverImage: "https://picsum.photos/200",
    category: "Art",
    creator: {
      id: "1",
      name: "Owner 1",
      address: "0x123",
      profileImage: "https://picsum.photos/200",
      coverImage: "https://picsum.photos/200",
    },
    itemNumber: 2,
    createdAt: "2021-08-01",
    description: "Collection 1 description",
    totalVolume: 2,
    floorPrice: 1,
    items: [
      {
        id: "1",
        collectionId: "1",
        ownerId: "1",
        name: "NFT 1",
        image: "https://picsum.photos/200",
      },
      {
        id: "2",
        collectionId: "1",
        ownerId: "1",
        name: "NFT 2",
        image: "https://picsum.photos/200",
      },
    ],
  },
];
