import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";
import Banner from "../Sections/Banner";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);

      // Start the fade animation when scrolled into fixed position
      if (scrolled) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        });
      } else {
        controls.start({
          opacity: 0,
          y: -20,
          transition: { duration: 0.3, ease: "easeIn" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <>
      {/* Scrollable banner */}
      <div className="container-fluid mx-auto">
        <Banner />
      </div>

      {/* Animated Header */}
      <motion.div
        className={`w-full z-50 fixed right-0 ${
          isScrolled ? "top-0 bg-blue-500 shadow-md" : "top-12 bg-blue-500"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
      >
        <div className="container px-4 md:px-8 mx-auto flex justify-between items-center py-2 md:py-4 transition duration-300 ease-in-out">
          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>

          {/* Logo */}
          {/* <Logo /> */}

          {/* Navigation links (hidden on mobile) */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* Cart drawer and additional options */}
          <div className="inline-flex items-center space-x-4">
            <CartDrawer />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Header;
