import ContactForm from "@/components/Sections/ContactForm";
import SectionWrap from "@/components/elements/SectionWrap";
import BranchLayout from "@/components/Layouts/BranchLayout";
import MetaTags from "@/components/headers/MetaData";
import Spacer from "@/components/ui/Spacer";




export default function Home() {
  return (
    <>
      <MetaTags
        title="Contact Us - AI/ML Powered Digital Marketing Agency"
        description="Get in touch with CycoServe Labs for inquiries, partnerships, or support. We are here to assist with all your web development and open-source innovation needs. Reach out today!"
        url="https://cycoserve.com/contact"
        imageUrl="https://cycoserve.com/assets/images/contact-og-image.jpg"
      />
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
