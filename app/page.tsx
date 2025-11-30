"use client";

import Hero from "./hero/page";
import Footer from "./footer/page";
import CyberNeonPage from "./gsapthree/page";
import MyInformation from "../components/MyInformation";
import DevelopersShowcase from "./gsaptwo/page";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";




export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center bg-black">
      <HeroSection  />
      <Hero />
      <CyberNeonPage />
      <DevelopersShowcase />
      <MyInformation />
      <Footer />
    </main>
  );
}
