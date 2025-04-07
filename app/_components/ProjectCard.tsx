"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import ProjectTechnologiesMini from "./ProjectTechnologiesMini";
import { motion } from "framer-motion";

interface ProjectProps {
  id: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  videoUrl: string;
  videoGameplayUrl: string;
  techStack: string[];
  liveDemoUrl: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const { id, heading, imageUrl, techStack } = project;

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
      >
        <img
          src={imageUrl}
          alt={heading}
          className="w-full h-auto"
        />
      </Link>
      <div>
        <h3 className="text-2xl sm:text-3xl font-semibold">{heading}</h3>
        <div className="mt-4 flex flex-col sm:flex-row justify-between gap-5">
          <ProjectTechnologiesMini techStack={techStack} />
            <MoveUpRight className="size-5 sm:size-8 text-[#F3F4F3] dark:text-dark-200" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;