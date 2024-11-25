import Link from "next/link";
"use client";

import { portfolioProjects } from "../_lib/constants";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import ShinyButton from "./ui/ShinyButton";
import { ChevronRight } from "lucide-react";


const ProjectsSection = () => {
  return (
    <div className="py-32 scale-105" id="work">
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between">
        
        <motion.h1
          initial={{ opacity: 0, x: -75 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200"
        >
          My Projects and School works
        </motion.h1>

{/*<ShinyButton icon={<ChevronRight />}>
          <Link href="https://github.com/Victor9955" target="_blank">
            All Projects
          </Link>
        </ShinyButton> */}
        
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-8">
        {portfolioProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
    </div>
    
  );
};

export default ProjectsSection;
