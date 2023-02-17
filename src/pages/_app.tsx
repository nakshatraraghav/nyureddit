import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Layout from "@/layouts/Layout";
import { Provider } from "jotai";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
