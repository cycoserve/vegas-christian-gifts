import Link from "next/link";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ShoppingCart, X } from "lucide-react";
import CartComponent from "../elements/CartComponent";
import { ScrollArea } from "../ui/scroll-area";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="text-white"
      >
        <ShoppingCart className="w-8 h-8" />
      </button>
      <div className="rounded-lg">
        <Drawer
          lockBackgroundScroll={true}
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="mobile-menu !h-[90vh] !w-full rounded-t-[20px]"
          overlayColor="rgba(0, 0, 0, 0.5)"
          size="100%"
        >
          <div className="bg-white h-full w-full relative">
            <button 
              onClick={toggleDrawer}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="list flex flex-col justify-stretch h-full items-start text-zinc-900 py-0 text-xl gap-0">
              <ScrollArea className="w-full h-[calc(90vh-2rem)] pt-16 pb-12 px-4">
                <CartComponent onClose={toggleDrawer} />
              </ScrollArea>
            </div>
          </div>
        </Drawer>
      </div>
      <style jsx global>{`
        .mobile-menu {
          transition: transform 0.3s ease-in-out !important;
        }
        .mobile-menu[data-state="entering"], .mobile-menu[data-state="entered"] {
          transform: translateY(0) !important;
        }
        .mobile-menu[data-state="exiting"], .mobile-menu[data-state="exited"] {
          transform: translateY(100%) !important;
        }
      `}</style>
    </>
  );
};

export default CartDrawer;
