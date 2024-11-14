import React from 'react';
import MetaData from '@/components/headers/MetaData';
import ContactForm from '@/components/Sections/ContactForm';
import SectionWrap from '@/components/elements/SectionWrap';
import Layout from '@/components/Layouts/RootLayout';
import Spacer from '@/components/ui/Spacer';

export default function ContactPage() {
  return (
    <>
      <MetaData
        title="Contact Us - Vegas Christian Gifts"
        description=""
        keywords=""
        url="https://www.vegaschristiangifts.com/about"
        imageUrl="https://www.vegaschristiangifts.com/assets/about-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
      />
      <div className="bg-[url('/assets/contacthero-bg.jpg')] bg-cover bg-center">
        <Layout>
          <SectionWrap>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full pt-4">
                <ContactForm />
              </div>
            </div>
          </SectionWrap>
          <Spacer />
        </Layout>
      </div>
    </>
  );
}
