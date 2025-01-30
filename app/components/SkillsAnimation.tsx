import React, { useEffect, useState } from "react";

function shuffleArray(arr: string[], lastSkills: string[]): string[] {
  let arrCopy = [...arr];
  let shuffled: string[] = [];

  do {
    for (let i = arrCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    shuffled = [arrCopy[0], arrCopy[1], arrCopy[2]];
  } while (
    shuffled[0] === lastSkills[0] ||
    shuffled[1] === lastSkills[1] ||
    shuffled[2] === lastSkills[2]
  );

  return shuffled;
}

interface Props {
  skills: string[];
}

function SkillsAnimation({ skills }: Props) {
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setCurrentSkills([skills[0], skills[1], skills[2]]);
    const intervalId = setInterval(() => {
      setCurrentSkills((prevSkills) => {
        const shuffled = shuffleArray(skills, prevSkills);
        setFadeKey((prevKey) => prevKey + 1);
        return shuffled;
      });
    }, 7000);

    return () => clearInterval(intervalId);
  }, [skills]);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8 font-bold sm:text-2xl">
      {currentSkills.map((skill, index) => (
        <span
          key={`${fadeKey}-${index}`}
          className="skill-item text-indigo-600 transition-transform duration-300 ease-out hover:scale-105 opacity-0"
          style={{
            animation: `fadeInOutSequence 7s ease-in-out ${index * 0.5}s infinite`,
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default SkillsAnimation;
