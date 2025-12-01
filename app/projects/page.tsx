"use client"
// import HeroCarousel from "@/components/ProjectsInteractiveFull"
import dynamic from "next/dynamic"

const HeroCarousel = dynamic(() => import("@/components/ProjectsInteractiveFull"), { ssr: false });
const page = () => {
  return (
    <div className="z-50">
      <HeroCarousel />
    </div>
  )
}
export default page
