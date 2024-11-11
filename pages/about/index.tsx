import React from "react";
import MetaData from "@/components/headers/MetaData";
import SectionWrap from "@/components/elements/SectionWrap";
import Spacer from "@/components/ui/Spacer";
import MissionVision from "@/components/Sections/MissionVision";
import { NewsletterSignupComponent } from "@/components/marketing/newsletter-signup";
import AboutHero from "@/components/Sections/AboutHero";
import BranchLayout from "@/components/Layouts/BranchLayout";
import OurTeam from "@/components/Sections/OurTeam";

export default function AboutPage() {
  return (
    <>
      <MetaData
        title="About Vegas Girl Tees | Las Vegas Fashion Story"
        description="Discover the story behind Vegas Girl Tees - your premier destination for unique Las Vegas fashion. Learn about our passion for creating custom t-shirts and accessories that capture the spirit of Vegas."
        keywords="Vegas Girl Tees story, Las Vegas fashion brand, custom t-shirt company, Vegas style history, about Vegas Girl Tees"
        url="https://www.vegasgirltees.com/about"
        imageUrl="https://www.vegasgirltees.com/assets/about-image.jpg"
        siteName="Vegas Girl Tees"
        locale="en_US"
        themeColor="#EC4899"
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
