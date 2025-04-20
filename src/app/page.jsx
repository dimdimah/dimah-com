import React from "react";
import Link from "next/link";
import Image from "next/image";
import { profileData, educationData, projectDatas } from "@/data/home";
import ProfileCard from "@/components/profileCard";

export default function HomePage() {
  return (
    <main className="container max-w-[725px] leading-relaxed antialiased pb-20">
      <ProfileCard
        name={profileData.name}
        position={profileData.position}
        description={profileData.description}
        links={profileData.links}
      />
      {/* Education Section */}
      <p className="font-semibold mt-16">Education</p>
      <div className="mt-4 flex flex-col divide-foreground/10">
        {educationData.map((edu, index) => (
          <Link
            key={index}
            href={edu.url}
            target="_blank"
            className="block py-2 mb-3 hover:bg-lime-600/10 -mx-3 px-3 rounded-md"
          >
            <h1 className="flex flex-row justify-between">
              <span>{edu.institution}</span>
              <span className="opacity-50 text-sm">{edu.duration}</span>
            </h1>
            <h2 className="opacity-70 text-sm">{edu.description}</h2>
          </Link>
        ))}
      </div>
      {/* Projects Section */}
      <p className="font-semibold mt-16">Projects</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        {projectDatas.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            className="relative hover:bg-lime-600/10 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
          >
            <Image
              src={project.imageUrl}
              width={400}
              height={300}
              alt="test-image"
              className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
            />
            <div className="mt-4 flex flex-row items-start justify-between w-full">
              <p>{project.nameProject}</p>
              <p className="text-xs opacity-50">{project.pub_year}</p>
            </div>
            <h2 className="opacity-70">{project.tagline}</h2>
            <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
              {project.techstack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-foreground/5"
                >
                  {tech}
                </span>
              ))}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
