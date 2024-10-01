import { motion } from "framer-motion";
import Hero from "@/components/Sections/Hero";
// import TwoColSection from "@/components/Sections/TwoColSection";
import ThreeColSection from "@/components/Sections/ThreeColSection";
import TitleSection from "@/components/Sections/TitleSection";
// import SwiperComponent from "@/components/Sections/SwiperComponent";
// import PageEndHero from "@/components/elements/PageEndHero";
import SectionWrap from "@/components/elements/SectionWrap";
import { NewsletterSignupComponent } from "@/components/marketing/newsletter-signup";
import Spacer from "@/components/ui/Spacer";
import MetaTags from "@/components/headers/MetaData";
import BranchLayout from "@/components/Layouts/BranchLayout";
import ProductCategoriesGrid from "@/components/Sections/ProductCategoryGrid";




export default function Home() {
  // Framer Motion animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <MetaTags
        title="Vegas Girl Tees - AI/ML Powered Digital Marketing Agency"
        description="CycoServe Labs is leading the way in open-source innovation, offering powerful tools for web development, AI, and data-driven technologies. Join us in making technology more accessible and open to innovators worldwide."
        url="https://cycoserve.com"
        imageUrl="https://cycoserve.com/assets/images/og-image.jpg"
      />

      <BranchLayout>
        {/* Hero Section */}
        <Hero />
        {/* Top Banner */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* <TopBanner /> */}
        </motion.div>

        {/* Features Section */}
        <div className=" wrap min-h-full py-12">
          <SectionWrap>
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mx-auto md:px-0">

              </div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProductCategoriesGrid />
              {/* <SwiperComponent /> */}
            </motion.div>
          </SectionWrap>
        </div>

        {/* 2 Col Section */}
        {/* <div className="py-24 bg-gray-100">
          <SectionWrap>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TitleSection
                title="Where Professionalism Meets Generosity"
              />
            </motion.div>
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TwoColSection
                title1="Streamlined Web Development"
                description1="Rest assured with our professional approach using GitHub and CI/CD, safeguarding your code integrity and eliminating worries of loss."
                image1="/assets/development.jpg"
                title2="Generous Hosting Terms"
                description2="Benefit from our cost-effective model - no hosting fees until your web app exceeds generous usage limits, ensuring scalability without lock-in."
                image2="/assets/hosting.jpg"
              />
            </motion.div>
          </SectionWrap>
        </div> */}

        {/* 3 Col Section */}
        <div className="three bg-slate-100 py-24">
          <SectionWrap>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TitleSection

                title="Custom Printing Services"
              />
            </motion.div>
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ThreeColSection
                title1="Custom T-Shirt Printing"
                description1="Bring your Vegas-inspired designs to life with our high-quality custom t-shirt printing. From glittering graphics to neon-bright colors, we make your ideas shine."
                image1="/products/custom-tshirt.png"
                title2="Vegas-Themed Collections"
                description2="Explore our ready-to-wear collections featuring iconic Las Vegas symbols. From casino chips to showgirl feathers, our designs capture the spirit of Sin City."
                image2="/products/custom-tshirt.png"
                title3="Personalized Vegas Souvenirs"
                description3="Create unforgettable memories with our personalized Vegas souvenirs. Perfect for bachelorette parties, family reunions, or just celebrating the Vegas lifestyle."
                image3="/products/custom-tshirt.png"
              />
            </motion.div>
          </SectionWrap>
        </div>

        {/* Page End Hero */}
        {/* <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl py-12 mx-auto"
        >
          <SectionWrap>
            <PageEndHero
              background=""
              title="Transform Your Digital Presence"
              description="We offer cutting edge digital services that will enhance your company's online presence. "
              bptext="Download"
              bpurl="https://github.com/cycoserve/CycoServe"
              bstext="Guides"
              bsurl="https://docs.cycoserve.com/"
            />
          </SectionWrap>
        </motion.div> */}

        {/* Newsletter Signup */}
        <SectionWrap>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto pt-12"
          >
            <NewsletterSignupComponent />
          </motion.div>
        </SectionWrap>
        <Spacer />
      </BranchLayout>
    </>
  );
}
