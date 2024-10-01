import React from "react";
import Head from "next/head";
import SectionWrap from "@/components/elements/SectionWrap";
import Spacer from "@/components/ui/Spacer";
import MissionVision from "@/components/Sections/MissionVision";
import { NewsletterSignupComponent } from "@/components/marketing/newsletter-signup";
import AboutHero from "@/components/Sections/AboutHero";
import MetaTags from "@/components/headers/MetaData";
import BranchLayout from "@/components/Layouts/BranchLayout";
import OurTeam from "@/components/Sections/OurTeam";



export default function AboutPage() {
  return (
    <>
      <MetaTags
        title="About Us - AI/ML Powered Digital Marketing Agency"
        description="CycoServe Labs is leading the way in open-source innovation, offering powerful tools for web development, AI, and data-driven technologies. Join us in making technology more accessible and open to innovators worldwide."
        url="https://cycoserve.com"
        imageUrl="https://cycoserve.com/assets/images/og-image.jpg"
      />
      <BranchLayout>
        <AboutHero/>
        <SectionWrap>
          <MissionVision />
        </SectionWrap>
        <Spacer />
        <SectionWrap>
          <OurTeam />
        </SectionWrap>
        <SectionWrap>
          <NewsletterSignupComponent />
        </SectionWrap>
        <Spacer />
      </BranchLayout>
    </>
  );
}
