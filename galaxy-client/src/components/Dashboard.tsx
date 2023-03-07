import { ALL_COLLECTIONS } from "@/api/query";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";

interface Collection {
  id: string;
  nftId: string;
  name: string;
  category: string;
  totalVolume: number;
  floorPrice: string;
  profileImage: string;
  createdAt: string;
}

interface Nft {
  id: string;
  name: string;
  image: string;
}

const Dashboard = () => {
  const [collectionId, setCollectionId] = useState("3");
  const { data, loading, error } = useQuery(ALL_COLLECTIONS, {
    variables: {
      collectionId: `${collectionId}`,
    },
  });
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Not fetching :(</h1>;

  return (
    <section className="py-1 mx-auto">
      <div className="pt-8 pb-8 bg-gray-900 shadow">
        <div className="px-8 border-b">
          <div className="flex flex-wrap items-center mb-3">
            <h3 className="text-2xl font-bold text-white">Trending NFTs</h3>
          </div>
          <div className="flex justify-between pb-8 px-4">
            {data.nftsByCollection.map((nft: Nft) => (
              <div key={`${nft.id}/${nft.name}`} className="relative">
                <Image
                  width={300}
                  height={300}
                  src={nft.image}
                  alt="nftsByCollection"
                  className="rounded-3xl shadow-md w-full"
                />
                <div className="absolute bg-black w-full h-10 bottom-0 left-0 opacity-60 rounded-b-3xl"></div>
                <p className="font-semibold text-sm text-white absolute bottom-[0.62rem] left-3">
                  {nft.name}
                </p>
              </div>
            ))}
          </div>
          <div>
            <a
              className="inline-block px-4 pb-2 text-sm font-bold text-white border-b-2 border-white"
              href="#"
            >
              ALL
            </a>
            <a
              className="inline-block px-4 pb-2 text-sm font-medium text-gray-500 border-b-2 border-transparent"
              href="#"
            >
              PFPs
            </a>
            <a
              className="inline-block px-4 pb-2 text-sm font-medium text-gray-500 border-b-2 border-transparent"
              href="#"
            >
              ART
            </a>
            <a
              className="inline-block px-4 pb-2 text-sm font-medium text-gray-500 border-b-2 border-transparent"
              href="#"
            >
              GAMING
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="flex items-center pl-8 pt-8 font-medium">
                  <span>COLLECTION</span>
                </th>
                <th className="pt-8 font-medium text-right pr-10">
                  FLOOR PRICE
                </th>
                <th className="pt-8 font-medium text-right pr-10">VOLUME</th>
                <th className="pt-8 font-medium text-right pr-10">CATEOGRY</th>
                <th className="pt-8 font-medium text-right pr-10">
                  CREATED AT
                </th>
              </tr>
            </thead>
            <tbody>
              {data.allCollections.map(
                (collection: Collection, index: number) => (
                  <tr key={`${collection.id}/${collection.name}`}>
                    <td className="flex items-center my-3 px-8 font-medium">
                      <p className="mr-7 text-white text-lg">{index + 1}.</p>
                      <button onClick={() => setCollectionId(collection.id)}>
                        <Image
                          width={60}
                          height={60}
                          src={collection.profileImage}
                          alt="collectionProfileImage"
                          className="rounded-xl shadow-md mr-3"
                        />
                      </button>
                      <p className="text-white text-sm">{collection.name}</p>
                    </td>
                    <td className="text-white text-sm text-right pr-10">
                      {collection.floorPrice} ETH
                    </td>
                    <td className="text-white text-sm text-right pr-10">
                      {collection.totalVolume} ETH
                    </td>
                    <td className="text-white text-sm text-right pr-10">
                      {collection.category.toUpperCase()}
                    </td>
                    <td className="text-white text-sm text-right pr-10">
                      {collection.createdAt}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
