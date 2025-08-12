import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  
  <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
    
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    <Footer />
  </div>
);

export default Layout;