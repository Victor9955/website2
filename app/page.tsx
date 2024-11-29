import {
  BriefcaseBusiness,
  Contact as ContactIco,
  House,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/app/_components/ui/Navbar";
import HeroSection from "@/app/_components/HeroSection";
import Skills from "@/app/_components/Skills";
import ShinyButton from "@/app/_components/ui/ShinyButton";
import { ChevronRight } from "lucide-react";
import ProjectsSection from "@/app/_components/ProjectsSection";
import Footer from "@/app/_components/Footer";

const navItems = [
  { name: "Home", link: "#home", icon: <House /> },
  { name: "Work", link: "#work", icon: <BriefcaseBusiness /> },
  { name: "Contact", link: "#contact", icon: <ContactIco /> },
];

const Homepage = () => {
  return (
    <main className="flex flex-col px-5 sm:px-10 relative">
      <div className="max-w-7xl mx-auto w-full">
        <Navbar navItems={navItems} />
        <HeroSection />
        <Skills />
        <ProjectsSection />

        {/* Game Jam Section */}
      <div className="py-32 bg-white dark:bg-dark-100 text-center flex flex-col items-center">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold max-w-3xl leading-snug tracking-wide text-white dark:text-stone-200/90 mb-10">
          You can look at my Game Jams projects on my itch.io page!
        </p>
        <div className="flex justify-center">
          <ShinyButton icon={<ChevronRight />}>
            <a href="https://victor9955.itch.io/" target="_blank" rel="noopener noreferrer">
              Visit My Itch.io
            </a>
          </ShinyButton>
        </div>
      </div>
        
        <Footer />
      </div>
    </main>
  );
};

export default Homepage;
