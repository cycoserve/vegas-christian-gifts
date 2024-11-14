import Link from "next/link";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ShoppingCart } from "lucide-react"; // Import the shopping cart icon
import CartComponent from '@/components/elements/CartComponent'

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="text-white" // Ensure the icon is white
      >
        <ShoppingCart className="w-8 h-8" /> {/* Shopping cart icon with smaller size */}
      </button>
      <div className="rounded-lg">
        <Drawer
          lockBackgroundScroll={true}
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="mobile-menu"
          overlayColor="white"
          size={280}
        >
          <div className="bg-white h-full w-full">
            <div className="list flex flex-col justify-stretch h-full items-start text-zinc-900 py-0 text-xl gap-0">
                  <div className="w-full py-12">

 
                    <CartComponent />
                  </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default CartDrawer;
