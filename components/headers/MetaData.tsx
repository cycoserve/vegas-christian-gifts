import Head from 'next/head';

const MetaData = ({ 
  title = "Vegas Christian Gifts - Handcrafted and Personalized Faith-Based Gifts",
  description = "Explore Vegas Christian Gifts for unique, handcrafted Las Vegas-themed gifts and keepsakes inspired by Christian values. Personalize gifts with your own message, perfect for any occasion, and crafted to last for generations.",
  keywords = "Vegas Christian Gifts, Las Vegas Gifts, Handcrafted Gifts, Faith-Based Gifts, Christian Gifts, Personalized Gifts, Wholesale Gifts, Keepsakes",
  url = "https://www.vegaschristiangifts.com",
  imageUrl = "https://www.vegaschristiangifts.com/assets/og-image.jpg",
  siteName = "Vegas Christian Gifts",
  locale = "en_US",
}) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vegas Christian Gifts" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Hardcoded theme color */}
      <meta name="theme-color" content="#2563eb" />

      {/* Canonical Link and Favicon */}
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaData;
