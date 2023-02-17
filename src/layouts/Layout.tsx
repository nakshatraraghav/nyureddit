import React from "react";

import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
