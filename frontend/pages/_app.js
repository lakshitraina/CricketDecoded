import '../styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cricket Decoded | AI-Powered Match Predictions & News</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get the most accurate cricket match predictions, toss predictions, and pitch reports. IPL 2026 insights powered by AI." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script 
        src="https://pl28986518.profitablecpmratenetwork.com/e5/06/71/e50671db127d3e85ae433026ca75f547.js" 
        strategy="beforeInteractive" 
      />

      <Component {...pageProps} />

      {/* Adsterra Social Bar */}
      <Script 
        src="https://pl28986521.profitablecpmratenetwork.com/5b/cb/a9/5bcba988f2cf28133bbb19565e8d0a29.js" 
        strategy="lazyOnload"
      />
    </>
  );
}

export default MyApp;
