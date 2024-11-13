import React from "react";
import { ReactNode } from "react";
import Footer from "../footers/Footer";
import Header from "../headers/Header";


interface BranchLayoutProps {
  children: ReactNode;
}

const BranchLayout: React.FC<BranchLayoutProps> = ({ children }) => {


  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="pt-12 md:pt-24 bg-white">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default BranchLayout;
