/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head";
import { Toaster } from "ui/@/components/ui/toaster";

import { HomeComponent } from "ui/components/home/home";

function HomePage() {
  return (
    <div className={""}>
      <Head>
        <title>Triourism</title>
      </Head>
      <main className={""}>
        <HomeComponent />
        <Toaster />
      </main>
    </div>
  );
}

export default HomePage;
