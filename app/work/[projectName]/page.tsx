import Footer from "@/app/_components/Footer"; 
import ProjectTechnologiesMini from "@/app/_components/ProjectTechnologiesMini";
import { Navbar } from "@/app/_components/ui/Navbar";
import ShinyButton from "@/app/_components/ui/ShinyButton";
import { portfolioProjects } from "@/app/_lib/constants";
import fs from "fs";
import path from "path";
import MarkdownContent from "@/app/_components/MarkdownContent";
import {
  BriefcaseBusiness,
  Code,
  ContactIcon,
  Globe,
  House,
  MoveDown,
  UserRound,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateMetadata({
  params,
}: {
  params: { projectName: string };
}) {
  const projectId = params.projectName;
  const project = portfolioProjects.find((project) => project.id === projectId);

  if (!project) return { title: "Not Found" };

  return {
    title: `Project ${project.heading}`,
  };
}

const navItems = [
  { name: "Home", link: "/", icon: <House /> },
  { name: "Work", link: "/#work", icon: <BriefcaseBusiness /> },
  { name: "Contact", link: "/#contact", icon: <ContactIcon /> },
];

const ProjectOverview = ({ params }: { params: { projectName: string } }) => {
  const projectId = params.projectName;
  const project = portfolioProjects.find((project) => project.id === projectId);

  if (!project) return notFound();

  const {
    heading,
    subheading,
    techStack,
    liveDemoUrl,
    videoUrl
  } = project;

  let markdownContent = '';
  if (project.contentPath) {
    const markdownPath = path.join(process.cwd(), 'public', project.contentPath);
    markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  }


  return (
    <main className="flex flex-col px-5 sm:px-10 relative">
      <div className="max-w-7xl mx-auto w-full ">
        <Navbar navItems={navItems} />

        <div className="pt-36">
          <div className="h-screen w-full dark:bg-dark-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.06] absolute top-0 left-0 flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] " />
          </div>

          <div className="relative z-10">
            <h1 className="text-[40px] md:text-6xl lg:text-7xl text-center max-w-5xl leading-normal tracking-wide uppercase mx-auto">
              <span className="font-black">{heading}</span>
              <br />
              {subheading}
            </h1>

            <div className="flex items-center justify-center my-24">
              <Link href="#image">
                <MoveDown className="size-16" strokeWidth={1} />
              </Link>
            </div>

{/* Video Section */}
<div className="rounded-lg overflow-hidden mb-16 aspect-video">
  <iframe
    className="w-full h-full rounded-lg"
    src={videoUrl}
    title={`${heading} Video`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>
            {markdownContent && (
        <div className="mt-16 mb-32 w-full">
          <MarkdownContent content={markdownContent} />
        </div>
      )}
            <div className="mt-8 mb-32 flex flex-col md:flex-row gap-10 md:gap-5 justify-between">
              <div className="flex items-center">
                <ProjectTechnologiesMini techStack={techStack} />
              </div>
              <div className="flex items-center">
                <ShinyButton icon={<Globe />} iconPosition="left">
                  <Link href={liveDemoUrl} target="_blank">
                    Play Link
                  </Link>
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default ProjectOverview;
