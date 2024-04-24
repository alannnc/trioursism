/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head";

import { HomeComponent } from "ui/components/home/home";

function HomePage() {
  return (
    <div className={""}>
      <Head>
        <title>Triourism</title>
      </Head>
      <main className={""}>
        <HomeComponent />
      </main>
    </div>
  );
}

export default HomePage;
