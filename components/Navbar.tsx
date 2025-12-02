"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import GooeyNav from "@/components/GooeyNav";

const items = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/projectRequestSection" },
  { label: "About", href: "/about" },
  { label: "Developers", href: "/developers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black px-4 h-12 flex items-center justify-between w-full z-50 relative overflow-visible">

      {/* --- Desktop Nav (Hidden on mobile) --- */}
      <div className="hidden md:block w-full">
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

      {/* --- Mobile Hamburger Button --- */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- Mobile Menu --- */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-black/95 md:hidden flex flex-col items-start p-6 space-y-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white text-lg py-2 mt-4"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
