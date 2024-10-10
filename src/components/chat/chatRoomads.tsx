import { useEffect } from 'react';
import Head from 'next/head';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const ChatRoomAds = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window?.adsbygoogle;
        // console.log({ adsbygoogle })
        adsbygoogle.push({});
      } catch (e) {
        console.error(e);
      }
    };

    let interval = setInterval(() => {
      if (window.adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5284912266208022"
        data-ad-slot="6250186998"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default ChatRoomAds;
