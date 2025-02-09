import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React from "react";
import ScrollFade from "~/components/ScrollFade";
import Skill from "~/components/Skill";
import { projects } from "~/data";

export const meta: MetaFunction = () => {
  return [
    { title: "My Projects" },
    { name: "description", content: "Welcome to my portfolio website!" },
  ];
};

function Projects() {
  return (
    <section id="projects" className="py-40 bg-white min-h-screen">
      <ScrollFade>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">My Projects and Assignments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl justify-center gap-4 mx-auto">
            {projects.map((project) => {
              return (
                <Skill
                  img={project.img}
                  link={project.link || ""}
                  variant="secondary"
                  key={project.title}
                  title={project.title}
                  description={project.description}
                />
              );
            })}
          </div>
        </div>
      </ScrollFade>
    </section>
  );
}

export default Projects;
