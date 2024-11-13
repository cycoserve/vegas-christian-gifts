import Link from "next/link";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Menu, X } from "lucide-react";  // Import the Hamburger Menu and Close icon from Lucide React
import { mobileMenuItems } from './data/mobileMenuItems';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="text-white"  // Ensure the icon is white
      >
        {/* Toggle between open and close icon */}
        {isOpen ? (
          <X className="w-8 h-8" />  // Close icon (X) when the menu is open
        ) : (
          <Menu className="w-8 h-8" />  // Hamburger menu when the menu is closed
        )}
      </button>
      <div className="rounded-lg">
        <Drawer
          lockBackgroundScroll={true}
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="mobile-menu"
          overlayColor="white"
          size={200}
        >
          <div className="bg-blue-500 h-full w-full">
            <div className="list flex flex-col justify-stretch h-full items-start text-zinc-900 py-0 text-xl gap-0">
              {mobileMenuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="w-full">
                    {/* Top Divider */}
                    <div className="w-full h-[1px] bg-blue-300" />
                    <Link href={item.url}>
                      <div className="p-4 text-white hover:bg-blue-600 hover:text-white transition duration-200">
                        {item.title}
                      </div>
                    </Link>
                    {/* Bottom Divider */}
                    <div className="w-full h-[1px] bg-blue-300" />
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
