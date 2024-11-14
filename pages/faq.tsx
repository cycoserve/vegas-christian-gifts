import React from 'react';
import RootLayout from '@/components/Layouts/RootLayout';
import FAQSection from '@/components/FAQ/FAQSection';
import faqData from '@/components/FAQ/faq-data.json';
import Head from 'next/head';

const FAQPage = () => {
  return (
    <RootLayout>
      <Head>
        <title>FAQ - Vegas Christian Gifts</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about Vegas Christian Gifts products, shipping, returns, and more."
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto">
          <FAQSection faqs={faqData.faqs} />
        </div>
      </main>
    </RootLayout>
  );
};

export default FAQPage;
