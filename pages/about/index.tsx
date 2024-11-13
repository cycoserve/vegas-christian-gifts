import React from "react";
import MetaData from "@/components/headers/MetaData";
import SectionWrap from "@/components/elements/SectionWrap";
import Spacer from "@/components/ui/Spacer";
import MissionVision from "@/components/Sections/MissionVision";
import { NewsletterSignupComponent } from "@/components/marketing/newsletter-signup";
import AboutHero from "@/components/Sections/AboutHero";
import BranchLayout from "@/components/Layouts/Layout";
import OurTeam from "@/components/Sections/OurTeam";
import Layout from "@/components/Layouts/Layout";

export default function AboutPage() {
  return (
    <>
      <MetaData
        title="Checkout | Vegas Christian Gifts"
        description=""
        keywords=""
        url="https://www.vegaschristiangifts.com/about"
        imageUrl="https://www.vegaschristiangifts.com/assets/about-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
        themeColor="#EC4899"
      />
      <Layout>
        <AboutHero/>
        <SectionWrap>
          <MissionVision />
        </SectionWrap>
        <Spacer />
        <SectionWrap>
          <NewsletterSignupComponent />
        </SectionWrap>
        <Spacer />
      </Layout>
    </>
  );
}
