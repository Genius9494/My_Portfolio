"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import IntroLoader from "@/components/IntroLoader";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    let lastScrollTop = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const st = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (st > lastScrollTop + 8) setShowNav(false);
          else if (st < lastScrollTop - 8) setShowNav(true);

          lastScrollTop = st;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <IntroLoader />

      {/* Navbar */}
      <div
        className={`sticky  top-0 z-30 transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-20"
          }`}
      >
        <Navbar />
      </div>

      <main className="relative w-full">
        {children}
      </main>

      <Toaster position="top-center" />
    </>
  );
}
