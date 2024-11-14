import React from "react";
import { ReactNode } from "react";
import Footer from "../footers/Footer";
import Header from "../headers/Header";
import Banner from "../Sections/Banner";


interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {


  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="bg-white">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
