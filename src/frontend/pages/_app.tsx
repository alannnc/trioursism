import { IcpConnectContextProvider } from "@bundly/ic-react";
import "../ui/styles/global.css";
import { Client, InternetIdentity } from "@bundly/ic-core-js";

const restCanisters = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_REST_URL!,
  },
};

export default function App({ Component, pageProps }) {
  const client = Client.create({
    restCanisters,
    providers: [
      new InternetIdentity({
        providerUrl: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL!,
      }),
    ],
  });

  return (
    <div className="bg-[#1A1A2E] text-white min-h-screen">
      <IcpConnectContextProvider client={client}>
        <Component {...pageProps} />
      </IcpConnectContextProvider>
    </div>
  );
}
