import React from 'react';
import MetaData from '@/components/headers/MetaData';
import ContactForm from '@/components/Sections/ContactForm';
import SectionWrap from '@/components/elements/SectionWrap';
import BranchLayout from '@/components/Layouts/BranchLayout';
import Spacer from '@/components/ui/Spacer';

export default function ContactPage() {
  return (
    <>
      {/* <MetaData
        title="Contact Vegas Girl Tees | Custom Las Vegas Fashion Support"
        description="Get in touch with Vegas Girl Tees for custom Las Vegas fashion inquiries, orders, and support. We're here to help with your Vegas style needs!"
        keywords="Vegas Girl Tees contact, Las Vegas fashion contact, custom t-shirts inquiry, Vegas style support, contact Vegas Girl Tees"
        url="https://www.vegasgirltees.com/contact-us"
        imageUrl="https://www.vegasgirltees.com/assets/contact-image.jpg"
        siteName="Vegas Girl Tees"
        locale="en_US"
        themeColor="#EC4899"
      /> */}
      <div className="bg-[url('/assets/contacthero-bg.jpg')] bg-cover bg-center">
        <BranchLayout>
          <SectionWrap>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full pt-4">
                <ContactForm />
              </div>
            </div>
          </SectionWrap>
          <Spacer />
        </BranchLayout>
      </div>
    </>
  );
}
