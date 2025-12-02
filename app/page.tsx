"use client";

import PortfolioEnhancedPage from "@/components/Hero";
import HeroSection from "../components/HeroSection";

import MyInformation from "../components/MyInformation";
import CyberNeonPage from "@/components/CyberNeon";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/ProjectsInteractiveFull";


// const PortfolioEnhancedPage = dynamic(() => import("@/components/Hero"), { ssr: false });
// const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
// const MyInformation = dynamic(() => import("@/components/MyInformation"), { ssr: false });
// const CyberNeonPage = dynamic(() => import("@/components/CyberNeon"), { ssr: false });
// const DevelopersShowcase = dynamic(() => import("@/components/Developers"), { ssr: false });
// const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
// const HeroCarousel = dynamic(() => import("@/components/ProjectsInteractiveFull"), { ssr: false });

export default function HomePage() {
  return (
    <div className="w-full min-h-screen text-white bg-black">
      {/* Hero Section */}
      <HeroSection />

      <div className="z-50 ">
        <HeroCarousel />
      </div>

      {/* Portfolio Enhanced Page */}
      <PortfolioEnhancedPage />
        {/* Cyber Neon / GSAP 3D Section */}
        <CyberNeonPage />
      
        
        {/* Personal / Info Section */}
        <MyInformation />

      {/* Footer */}
      <Footer />
    </div>
  );
}
