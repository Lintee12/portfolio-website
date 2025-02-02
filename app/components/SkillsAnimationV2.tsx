import React, { useEffect, useState } from "react";

interface Props {
  skills: string[];
}

function SkillsAnimation({ skills }: Props) {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isActuallyTyping, setIsActuallyTyping] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>("");
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2500;

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let deletingTimeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (isTyping) {
        setIsActuallyTyping(true);
        if (displayedText.length < skills[currentIndex].length) {
          typingTimeout = setTimeout(() => {
            setDisplayedText((prev) => prev + skills[currentIndex][displayedText.length]);
          }, typingSpeed);
        } else {
          setIsActuallyTyping(false);
          setTimeout(() => {
            setIsTyping(false);
          }, pauseTime);
        }
      } else {
        setIsActuallyTyping(true);
        if (displayedText.length > 0) {
          deletingTimeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        } else {
          setIsTyping(true);
          setIsActuallyTyping(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
        }
      }
    };

    handleTyping();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(deletingTimeout);
    };
  }, [displayedText, isTyping, currentIndex, skills]);

  return (
    <div className="flex flex-row flex-wrap justify-center items-center font-bold text-xl sm:text-3xl min-h-[28px] sm:min-h-[36px]">
      <span className="text-indigo-600 font-normal inline-block">{displayedText}</span>
      <div
        className={`text-sm sm:text-lg transition-all duration-75 ease-in-out text-left ${
          isActuallyTyping ? "opacity-100" : "type-wait"
        }`}
      >
        │
      </div>
    </div>
  );
}

export default SkillsAnimation;
