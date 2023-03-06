import { ALL_COLLECTIONS } from "@/api/query";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

interface Collection {
  id: string;
  name: string;
  category: string;
  totalVolume: number;
  floorPrice: string;
  profileImage: string;
}

const Dashboard = () => {
  const { data, loading, error } = useQuery(ALL_COLLECTIONS, {
    variables: {
      collectionId: "1",
      nftId: "5238",
    },
  });
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Not fetch :(</h1>;

  return (
    <section className="py-1 mx-auto">
      <div className="pt-6 bg-gray-900 shadow">
        <div className="px-6 border-b">
          <div className="flex flex-wrap items-center mb-6">
            <h3 className="text-xl font-bold text-white">NFT Dashboard</h3>
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
                <th className="flex items-center pl-8 py-4 font-medium">
                  <span>COLLECTION</span>
                </th>
                <th className="py-4 font-medium text-right pr-12">
                  FLOOR PRICE
                </th>
                <th className="py-4 font-medium text-right pr-12">VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {data.allCollections.map(
                (collection: Collection, index: number) => (
                  <tr
                    key={`${collection.id}/${collection.name}`}
                    className="text-xs"
                  >
                    <td className="flex items-center py-3 px-8 font-medium">
                      <p className="mr-7 text-white text-lg">{index + 1}.</p>
                      <Image
                        width={60}
                        height={60}
                        src={collection.profileImage}
                        alt=""
                        className="rounded shadow-md mr-3"
                      />
                      <p className="text-white text-sm">{collection.name}</p>
                    </td>
                    <td className="text-white text-sm text-right pr-12">
                      {collection.floorPrice} ATOM
                    </td>
                    <td className="text-white text-sm text-right pr-12">
                      {collection.totalVolume} ATOM
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
