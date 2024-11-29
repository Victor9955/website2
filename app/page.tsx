import {
  BriefcaseBusiness,
  Contact as ContactIco,
  House,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/app/_components/ui/Navbar";
import HeroSection from "@/app/_components/HeroSection";
import Skills from "@/app/_components/Skills";
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
        <div className="py-20 bg-white dark:bg-dark-100 text-center flex flex-col items-center">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold max-w-3xl leading-snug tracking-wide text-dark-200 dark:text-stone-200/70 mb-8">
            You can look at my Game Jams projects on my itch.io page!
          </p>
          <ShinyButton icon={<ChevronRight />}>
            <a href="https://your-itch-io-link.itch.io" target="_blank" rel="noopener noreferrer">
              Visit My Itch.io
            </a>
          </ShinyButton>
        </div>
        
        <Footer />
      </div>
    </main>
  );
};

export default Homepage;
