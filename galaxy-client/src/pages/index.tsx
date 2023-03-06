import Head from "next/head";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Galaxy : NFT Marketplace in Cosmos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Dashboard />
      </main>
    </>
  );
}
