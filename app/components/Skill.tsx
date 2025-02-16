import { Link } from "@remix-run/react";
import React from "react";

type SkillVariant = "primary" | "secondary";

interface Props {
  title: string;
  description: string;
  variant: SkillVariant;
  link?: string;
  img?: string;
}

function Skill(props: Props) {
  const { title, description, variant = "primary", link = "", img } = props;

  if (link !== "") {
    return (
      <div className="flex items-center gap-4 group py-6 rounded-lg transition-all will-change-transform hover:scale-[1.02] transform-gpu">
        {img && <img className="w-16 sm:w-24 rounded-md aspect-square" src={img}></img>}
        <div className={`py-6 rounded-lg flex flex-col`}>
          <h3 className={`text-2xl font-bold mb-4`}>{title}</h3>
          <p className="text-zinc-600">{description}</p>
          <Link
            to={link}
            className="text-lg text-indigo-500 w-fit pt-2 flex mt-auto hover:scale-105 transition-transform will-change-transform items-center"
          >
            Read More <span className="text-xl pl-1 text-inherit">›</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 group py-6 rounded-lg transition-all will-change-transform hover:scale-[1.02] transform-gpu">
      {img && <img className="w-16 sm:w-24 rounded-md aspect-square" src={img}></img>}
      <div className={``}>
        <h3
          className={`text-2xl font-bold mb-4 will-change-transform ${
            variant === "primary" ? "group-hover:text-orange-400" : "group-hover:text-indigo-500"
          } transition-colors duration-300`}
        >
          {title}
        </h3>
        <p className="text-zinc-600 will-change-transform">{description}</p>
      </div>
    </div>
  );
}

export default Skill;
