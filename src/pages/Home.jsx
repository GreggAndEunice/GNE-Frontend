import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection.jsx";
import WhatYouAreSection from "../components/home/WhatYouAreSection.jsx";
import Journey from "../components/home/JourneySection.jsx";
import Footer from "../components/Footer.jsx";
import GlowOrbs from "../components/GlowOrbs.jsx";

export const Home = () => {
  return (
    <div className="bg-[#09090f]">
      {/* Global Ambient Background */}
      <GlowOrbs />

      {/* Page */}
      <main className="relative z-10">
        <HeroSection />
        <WhatYouAreSection />
        <Journey />
        <Footer />
      </main>
    </div>
  );
};
