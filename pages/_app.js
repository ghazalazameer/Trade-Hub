import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>TradeHub</title>
        <meta name="description" content="TradeHub-Online Shopping Hub for all of your needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
    </>
  );
}

export default MyApp;