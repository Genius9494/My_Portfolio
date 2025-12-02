"use client"
import GooeyNav from "@/components/GooeyNav";

// update with your own items
const items = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/projectRequestSection" },
  { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
];

export default function Navbar() {
  return (
    <div className="bg-black/90 h-12 " >
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />

    </div>
  );
}