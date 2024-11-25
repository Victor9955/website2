"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import ProjectTechnologiesMini from "./ProjectTechnologiesMini";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ProjectProps {
  id: string;
  heading: string;
  subheading: string;
  description: string;
  imageUrl: string;
  videoUrl: string; // Video URL for hover effect
  videoGameplayUrl: string; // Video URL for hover effect
  techStack: string[];
  liveDemoUrl: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const { id, heading, imageUrl, videoGameplayUrl, techStack } = project;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      console.log("Playing video...");
      videoRef.current.playbackRate = 1;
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      console.log("Pausing video...");
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-[#F3F4F3] dark:bg-dark-200 rounded-lg p-4 sm:p-8 space-y-8"
    >
      <Link
        href={`/work/${id}`}
        className="rounded-lg overflow-hidden block relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video element */}
        {isClient && (
          <video
            ref={videoRef}
            src={videoGameplayUrl}
            muted
            autoPlay
            loop={false}
            playsInline
            controls={false} // Remove controls in production
            onError={(e) => {
              console.error("Video failed to load:", e);
            }}
            className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
        )}
        {/* Fallback image */}
        <img
          src={imageUrl}
          alt={heading}
          className="w-full h-auto transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        />
      </Link>
      <div>
        <h3 className="text-2xl sm:text-3xl font-semibold">{heading}</h3>
        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-5">
          <ProjectTechnologiesMini techStack={techStack} />
          <Link
            href={`/work/${id}`}
            className="p-3 bg-primary hover:bg-primary/80 transition-colors duration-200 rounded-lg self-start sm:self-end"
          >
            <MoveUpRight className="size-5 sm:size-8 text-[#F3F4F3] dark:text-dark-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
