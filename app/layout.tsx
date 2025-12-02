"use client"
import "./globals.css";
import {useEffect, useRef, useState } from 'react'
import { ThemeProvider } from "next-themes";

import Navbar from '../components/Navbar'
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import IntroLoader from "@/components/IntroLoader";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showNav, setShowNav] = useState<boolean>(true);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;
    let ticking = false;

    const onScroll = () => {
      const st = container.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (st > lastScrollTop + 8) setShowNav(false);
          else if (st < lastScrollTop - 8 || st <= 10) setShowNav(true);
          lastScrollTop = st;
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);


 
  
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className=' bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors'>
        <IntroLoader />
        <div
          className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out overflow-hidden
              ${showNav ? "translate-y-0" : "-translate-y-20"}`}
        >
          <Navbar />
        </div>
        
          {children}
        

        <Toaster position="top-center" reverseOrder={false} />


      </body>
    </html>
  )

}

export default RootLayout;
