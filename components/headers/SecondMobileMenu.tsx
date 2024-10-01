import Link from "next/link";
import React, { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import ButtonPrimary from "../ui/ButtonPrimary";
import Image from "next/image";
import ButtonExplore from "../ui/ButtonExplore";
import SearchComponent from "../Sections/SearchComponent";
import { mobileMenuItems } from './data/mobileMenuItems';
import Logo from "./Logo";



const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className={`text-${scrolled ? "black" : "black"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>
      <div className=" rounded-lg">
        <Drawer
          lockBackgroundScroll={true}
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="mobile-menu"
          overlayColor="white"
          size={280}
        >
          <div className="bg-pink-500 h-full w-full">
            {/* Action Buttons */}
            <div className="pt-12 pb-4 bg-white px-2 flex flex-row gap-2 justify-between items-center">
              <ButtonPrimary title={"Wishlist"} url={"#"} />
              <ButtonExplore title={"Cart"} url={"#"} />
            </div>
            {/* Search */}
            <div className="pt-2 pb-2 bg-white px-2 flex flex-row gap-2 justify-between items-center">
            </div>

            <div className="list flex flex-col justify-stretch h-full items-start text-zinc-900 py-0 text-xl gap-0">
              {mobileMenuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="w-full">
                    {/* Top Divider */}
                    <div className="w-full h-[1px] bg-pink-300" />
                    <Link href={item.url}>
                      <div className="p-4 text-white hover:bg-pink-600 hover:text-white transition duration-200">
                        {item.title}
                      </div>
                    </Link>
                    {/* Bottom Divider */}
                    <div className="w-full h-[1px] bg-pink-300" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileMenu;
