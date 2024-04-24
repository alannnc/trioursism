import "../ui/styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-[#1A1A2E] text-white min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
