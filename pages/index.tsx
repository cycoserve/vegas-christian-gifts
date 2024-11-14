import RootLayout from "@/components/Layouts/RootLayout";
import Hero from "@/components/Sections/Hero";
import MetaData from "@/components/headers/MetaData";
import ProductList from "@/components/products/productsList";
import Features from "../components/Sections/Features";

export default function Home() {
  return (
    <>
      <MetaData
        title="Vegas Christian Gifts - Faith-Inspired Gifts & Decor"
        description="Explore a heartfelt collection of faith-inspired gifts, including flower pots, home decor, and more at Vegas Christian Gifts. Perfect for sharing and celebrating your faith."
        keywords="Christian gifts, faith-inspired decor, religious gifts, Christian flower pots, home decor, unique Christian gifts, Vegas Christian Gifts"
        url="https://www.vegaschristiangifts.com"
        imageUrl="https://www.vegaschristiangifts.com/assets/homepage-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
      />
      <RootLayout>
        <Hero />
        <Features />
        <ProductList />
      </RootLayout>
    </>
  );
}