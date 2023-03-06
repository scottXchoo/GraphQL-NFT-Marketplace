import Head from "next/head";
import { useQuery } from "@apollo/client";
import { ALL_COLLECTIONS } from "@/api/query";
import Header from "@/components/Header";

interface Collection {
  id: string;
  name: string;
  category: string;
  totalVolume: number;
}

export default function Home() {
  const { data, loading, error } = useQuery(ALL_COLLECTIONS, {
    variables: {
      collectionId: "1",
      nftId: "5238",
    },
  });
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Not fetch :(</h1>;

  return (
    <>
      <Head>
        <title>Galaxy : NFT Marketplace in Cosmos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        {data.allCollections.map((collection: Collection) => (
          <div key={`${collection.id}/${collection.name}`}>
            <h3>{collection.name}</h3>
            Total Volume: {collection.totalVolume}
          </div>
        ))}
        <h1>{data.nft.name}</h1>
      </main>
    </>
  );
}
