// app/_components/ExperienceRoadmap.tsx

"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BriefcaseBusiness
} from "lucide-react";
import Image from "next/image";

// Types for experience items
export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  date: string; // Custom date text you can input
  icon: string; // Path to PNG image
}

// Experience data - easily extensible with custom date text
// Place your PNG files in the public folder (e.g., public/icons/rocket.png)
const experienceData: ExperienceItem[] = [
  {
    id: "1",
    title: "Bachelor Game Programming",
    company: "IIM Digital School",
    date: "Sept 2022 - Jan 2024",
    icon: "/icons/iim.png",
  },
  {
    id: "2",
    title: "Java Developper Intern",
    company: "INRAE",
    date: "Jan 2024 - Jun 2024",
    icon: "/icons/inrae.png",
  },
  {
    id: "3",
    title: "Master Game Programming",
    company: "IIM Digital School",
    date: "Sept 2024 - Jan 2026",
    icon: "/icons/iim.png",
  },
  {
    id: "4",
    title: "Gameplay Engineer Intern",
    company: "Virtuos",
    date: "Feb 2026 - Jul 2026",
    icon: "/icons/virtuos.png",
  },
];

// Individual timeline item component
const TimelineItem = ({ 
  experience, 
  index, 
  totalItems,
  containerWidth,
  cardHeight
}: { 
  experience: ExperienceItem; 
  index: number;
  totalItems: number;
  containerWidth: number;
  cardHeight: number;
}) => {
  // Calculate position for each item along the timeline
  const position = totalItems > 1 ? (index / (totalItems - 1)) * 100 : 50;

  // Calculate card width based on container - wider to fit text
  const cardWidth = Math.min(
    Math.max(240, (containerWidth - 100) / Math.min(totalItems, 5)),
    300
  );

  return (
    <div 
      className="absolute top-0 flex flex-col items-center"
      style={{ 
        left: `${position}%`,
        transform: 'translateX(-50%)',
      }}
    >
      {/* Date on top - now using custom date text */}
      <div className="text-[9px] sm:text-[15px] font-medium text-dark-200/60 dark:text-stone-400 mb-1.5 sm:mb-2 whitespace-nowrap">
        {experience.date}
      </div>
      
      {/* Timeline dot - slightly bigger */}
      <div className="flex-shrink-0 flex items-center justify-center relative z-10 mb-2 sm:mb-2.5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-md scale-150" />
          <div className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-2 border-white dark:border-dark-100 shadow-lg shadow-blue-500/30 dark:shadow-blue-400/30" />
        </div>
      </div>
      
      {/* Bottom content - Card - bigger and wider */}
      <div className="mt-0" style={{ width: `${cardWidth}px` }}>
        <div 
          className="bg-white/90 dark:bg-dark-200/90 backdrop-blur-sm rounded-lg p-3.5 sm:p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-stone-700/50 hover:border-blue-500/30 dark:hover:border-blue-400/30"
          style={{ minHeight: `${cardHeight}px` }}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* PNG Icon - bigger */}
            <div className="flex-shrink-0 mt-0.5 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 relative">
              <Image
                src={experience.icon}
                alt={experience.title}
                width={50}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Text content - no line clamping */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[12px] sm:text-sm md:text-base font-bold text-dark-100 dark:text-stone-200">
                {experience.title}
              </h4>
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400">
                {experience.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const ExperienceRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const totalItems = experienceData.length;
  const cardHeight = 80; // Increased card height
  const arrowHeadWidth = cardHeight * 0.75; // 0.75 of card height

  return (
    <div className="relative z-10 py-16 sm:py-24" id="experience">
      <div className="space-y-4 mb-10">
      </div>

      {/* Timeline Container */}
      <div 
        ref={containerRef}
        className="relative w-full px-4 sm:px-8"
      >
        <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px]">
          {/* Arrow Background SVG */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${Math.max(containerWidth, 400)} 300`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#332fd1" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            <rect
              x="20"
              y={150 - cardHeight/2}
              width={Math.max(containerWidth - 40 - arrowHeadWidth, 100)}
              height="8"
              rx="2"
              fill="url(#arrowGradient)"
              filter="url(#arrowShadow)"
            />
          </svg>

          {/* Round Gradient Background - Black edges to Blue center (behind arrow) */}
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-blue-500/70 via-blue-600/50 to-black/80">
            <div className="absolute inset-0 rounded-xl bg-gradient-radial from-blue-400/40 via-blue-600/30 to-black/70" />
            <div className="absolute inset-0 rounded-xl bg-gradient-radial from-blue-300/20 via-blue-500/30 to-black/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-400/15 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-blue-300/10 rounded-full blur-3xl" />
          </div>

          {/* Timeline items positioned on the timeline */}
          {experienceData.map((experience, index) => (
            <TimelineItem 
              key={experience.id}
              experience={experience}
              index={index}
              totalItems={totalItems}
              containerWidth={containerWidth}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceRoadmap;