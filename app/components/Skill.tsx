import { Link } from "@remix-run/react";
import React from "react";

type SkillVariant = "primary" | "secondary";

interface Props {
  title: string;
  description: string;
  variant: SkillVariant;
  link?: string;
}

function Skill(props: Props) {
  const { title, description, variant = "primary", link = "" } = props;

  if (link !== "") {
    return (
      <div className={`py-6 rounded-lg flex flex-col`}>
        <h3 className={`text-2xl font-bold mb-4`}>{title}</h3>
        <p className="text-zinc-600">{description}</p>
        <Link to={link} className="text-lg text-indigo-500 pt-2 w-full flex mt-auto">
          Read More ›
        </Link>
      </div>
    );
  }
  return (
    <div
      className={`py-6 rounded-lg transition-all will-change-transform hover:scale-[1.02] group transform-gpu`}
    >
      <h3
        className={`text-2xl font-bold mb-4 will-change-transform ${
          variant === "primary" ? "group-hover:text-orange-400" : "group-hover:text-indigo-500"
        } transition-colors duration-300`}
      >
        {title}
      </h3>
      <p className="text-zinc-600 will-change-transform">{description}</p>
    </div>
  );
}

export default Skill;
