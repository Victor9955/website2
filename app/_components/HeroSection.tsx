"use client";

import { ChevronRight, Download } from "lucide-react";
import ShinyButton from "./ui/ShinyButton";
import { AnimatedTooltip } from "./ui/Tooltip";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/TextGenerate";

const HeroSection = () => {
  return (
    <>
      {/* Background and radial gradient */}
      <div className="h-screen w-full dark:bg-dark-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.06] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Main content */}
      <div
        className="pb-20 sm:pb-0 pt-20 sm:pt-36 min-h-screen flex flex-col items-center justify-center relative"
        id="#home"
      >
        {/* Centered content */}
        <div className="flex flex-col justify-center items-center relative text-center px-6 sm:px-0">
          {/* Profile Picture */}
        <div
          className="max-w-[20vw] max-h-[20vw] sm:max-w-[15vw] sm:max-h-[15vw] w-full h-full rounded-full overflow-hidden mb-10 sm:mb-16"
          style={{ aspectRatio: "1 / 1" }}
        >
          <img
            src="imgs/avatars/ProfilePicture.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>


          {/* Title */}
          <TextGenerateEffect
            words="Victor Lacombe Game Programmer"
            className="text-[28px] sm:text-[36px] md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-snug tracking-wide"
          />

          {/* Subtitle */}
          <p className="pt-6 sm:pt-7 pb-8 sm:pb-10 text-base sm:text-lg md:text-xl text-dark-200 dark:text-stone-200/70 max-w-xl">
            I create smooth multiplayer experiences and complex game mechanics.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ShinyButton icon={<ChevronRight />}>
              <Link href="#work">See My Work</Link>
            </ShinyButton>
            <a
              href="/resume/CV.pdf"
              download
              className="flex items-center gap-3 group"
            >
              <Download className="text-primary" />
              <span className="group-hover:text-white/70 transition-colors duration-200 font-semibold">
                Download CV
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
