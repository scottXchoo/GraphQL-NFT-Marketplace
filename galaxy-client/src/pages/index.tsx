import Head from "next/head";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <>
      <Head>
        <title>Galaxy : The Multi-chain NFT Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RecoilRoot>
          <Header />
          <Dashboard />
          <Footer />
        </RecoilRoot>
      </main>
    </>
  );
}
