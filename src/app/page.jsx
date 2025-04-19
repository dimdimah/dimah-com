import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="container max-w-[725px] leading-relaxed antialiased pb-20">
      <p className="font-medium">Dimah Luthfi A.R</p>
      <p className="opacity-70 font-medium">Frontend Developer</p>
      <p className="text-foreground/70 mt-7">
        I am a front-end web developer who is passionate about creating
        something useful for many people. building{" "}
        <Link href={"/"} className="hover:text-lime-600/75">
          Harsa Edu
        </Link>{" "}
        as a front-end developer and{" "}
        <Link href={"/"} className="hover:text-lime-600/75">
          Harian app
        </Link>{" "}
        as a project manager. interested to work together contact me on{" "}
        <Link href={"/"} className="hover:text-lime-600/75">
          Instagram
        </Link>{" "}
        or{" "}
        <Link href={"/"} className="hover:text-lime-600/75">
          Linkedin
        </Link>{" "}
        .
      </p>
      {/* Education Section */}
      <p className="font-semibold mt-16">Education</p>
      <div className="mt-4 flex flex-col divide-foreground/10">
        <Link
          href={"/"}
          target="_blank"
          className="py-2 hover:bg-lime-600/10 -mx-3 px-3 rounded-md"
        >
          <h1 className="flex flex-row justify-between">
            <span>STMIK Amikom Surakarta</span>
            <span className="opacity-50 text-sm">Sep 2021 - Now.</span>
          </h1>
          <h2 className="opacity-70 text-sm">S1 Informatika | IPK 3.73</h2>
        </Link>
        <Link
          href={"/"}
          target="_blank"
          className="hover:bg-lime-600/10 -mx-3 py-2 px-3 rounded-md mt-3"
        >
          <h1 className="flex flex-row justify-between">
            <span>2023 Complete Front-End Engineer Career With ReactJS</span>
            <span className="opacity-50 text-sm">
              14 Aug 2023 - 31 Des 2023.
            </span>
          </h1>
          <h2 className="opacity-70 text-sm">MSIB Alterra Academy Batch 5</h2>
        </Link>
        <Link
          href={"/"}
          target="_blank"
          className="hover:bg-lime-600/10 -mx-3 py-2 px-3 rounded-md mt-3"
        >
          <h1 className="flex flex-row justify-between">
            <span>Intro to Product Management</span>
            <span className="opacity-50 text-sm">
              22 Jan 2024 - 3 Feb 2024.
            </span>
          </h1>
          <h2 className="opacity-70 text-sm">Revo U Mini Course</h2>
        </Link>
      </div>
      {/* Projects Section */}
      <p className="font-semibold mt-16">Projects</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <Link
          href={"https://github.com/HarsaEdu"}
          className="relative hover:bg-lime-600/10 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
        >
          <Image
            src={"/harsa-edu.png"}
            width={400}
            height={300}
            alt="test-image"
            className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
          />
          <div className="mt-4 flex flex-row items-start justify-between w-full">
            <p>Harsa Edu</p>
            <p className="text-xs opacity-50">2023</p>
          </div>
          <h2 className="opacity-70">Educate, Empower, Succeed</h2>
          <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Next.js
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Tailwindcss
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              ElysiaJs
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              PostgreSQL
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">AWS</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Docker</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Redis</span>
          </h2>
        </Link>
        <Link
          href={"https://github.com/HarsaEdu"}
          className="relative hover:bg-lime-600/10 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
        >
          <Image
            src={"/harsa-edu.png"}
            width={400}
            height={300}
            alt="test-image"
            className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
          />
          <div className="mt-4 flex flex-row items-start justify-between w-full">
            <p>Harsa Edu</p>
            <p className="text-xs opacity-50">2023</p>
          </div>
          <h2 className="opacity-70">Educate, Empower, Succeed</h2>
          <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Next.js
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Tailwindcss
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              ElysiaJs
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              PostgreSQL
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">AWS</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Docker</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Redis</span>
          </h2>
        </Link>
        <Link
          href={"https://github.com/HarsaEdu"}
          className="relative hover:bg-lime-600/10 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
        >
          <Image
            src={"/harsa-edu.png"}
            width={400}
            height={300}
            alt="test-image"
            className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
          />
          <div className="mt-4 flex flex-row items-start justify-between w-full">
            <p>Harsa Edu</p>
            <p className="text-xs opacity-50">2023</p>
          </div>
          <h2 className="opacity-70">Educate, Empower, Succeed</h2>
          <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Next.js
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Tailwindcss
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              ElysiaJs
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              PostgreSQL
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">AWS</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Docker</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Redis</span>
          </h2>
        </Link>
        <Link
          href={"https://github.com/HarsaEdu"}
          className="relative hover:bg-lime-600/10 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
        >
          <Image
            src={"/harsa-edu.png"}
            width={400}
            height={300}
            alt="test-image"
            className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
          />
          <div className="mt-4 flex flex-row items-start justify-between w-full">
            <p>Harsa Edu</p>
            <p className="text-xs opacity-50">2023</p>
          </div>
          <h2 className="opacity-70">Educate, Empower, Succeed</h2>
          <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Next.js
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              Tailwindcss
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              ElysiaJs
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">
              PostgreSQL
            </span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">AWS</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Docker</span>
            <span className="px-2 py-1 rounded-lg bg-foreground/5">Redis</span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
