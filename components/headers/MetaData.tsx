import Head from 'next/head';

const MetaData = ({ 
  title = "Vegas Girl Tees - Unique and Custom T-Shirts", 
  description = "Discover Vegas Girl Tees for custom, stylish Las Vegas-themed t-shirts, accessories, and more. Unique designs for any occasion, perfect for adding Vegas flair to your wardrobe!", 
  keywords = "Vegas Girl Tees, Las Vegas T-Shirts, Custom T-Shirts, Handmade T-Shirts, Unique T-Shirts, Women's T-Shirts, Vegas Apparel", 
  url = "https://www.vegasgirltees.com", 
  imageUrl = "https://www.vegasgirltees.com/assets/og-image.jpg", 
  siteName = "Vegas Girl Tees",
  locale = "en_US",
  themeColor = "#EC4899"  // Tailwind pink-500
}) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vegas Girl Tees" />
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

      {/* Mobile theme color */}
      <meta name="theme-color" content={themeColor} />

      {/* Canonical Link and Favicon */}
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MetaData;
