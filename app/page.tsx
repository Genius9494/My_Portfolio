"use client";

import PortfolioEnhancedPage from "@/components/Hero";
import HeroSection from "../components/HeroSection";

import MyInformation from "../components/MyInformation";
import CyberNeonPage from "@/components/CyberNeon";
import DevelopersShowcase from "../components/Developers";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/ProjectsInteractiveFull";

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

      {/* Developers Showcase */}
      <DevelopersShowcase />

      {/* Personal / Info Section */}
      <MyInformation />

      {/* Footer */}
      <Footer />
    </div>
  );
}
