import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import CartDrawer from "./CartDrawer";


function Header() {
  return (
    <> 
      <div
        className="w-full right-0 z-10  bg-blue-500 transition duration-600 ease-in-out"
      >
        <div className="container px-4 md:px-2 mx-auto flex justify-between items-center">
        <div className="div lg:hidden">
              <MobileMenu />
            </div>
          <Logo />
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="inline-flex">
            <div className="inline-block">
              <CartDrawer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
