import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";

function Navigation() {
  const [currentSection, setCurrentSection] = useState("");
  const sections = ["hero", "about", "skills", "projects", "contact"];

  const getCurrentSectionIndex = () => {
    return sections.indexOf(currentSection);
  };

  const getNavSections = () => {
    const currentIndex = getCurrentSectionIndex();
    const prevSection = sections[(currentIndex - 1 + sections.length) % sections.length];
    const nextSection = sections[(currentIndex + 1) % sections.length];
    return { prevSection, nextSection };
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sizes = sections.map((sectionId) => {
        const element = document.getElementById(sectionId);
        return {
          id: sectionId,
          top: element?.getBoundingClientRect().top || 0,
          height: element?.offsetHeight || 0,
        };
      });

      const middleOfScreen = window.innerHeight / 2;

      const current = sizes.find(
        (section) => section.top <= middleOfScreen && section.top + section.height >= middleOfScreen
      );

      if (current) {
        setCurrentSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const { prevSection, nextSection } = getNavSections();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-0 sm:top-0 sm:right-8 flex flex-col items-center justify-center pointer-events-auto">
      <button
        className="p-3 rounded-full bg-zinc-200/80 hover:bg-zinc-300/80 text-black hover:text-indigo-500 active:outline-none outline-indigo-500 aspect-square transition-all duration-300"
        onClick={() => scrollToSection(prevSection)}
        aria-label="Previous Section"
      >
        <span className="text-xl sm:text-2xl text-inherit">&#8593;</span>
      </button>

      <button
        className="p-3 mt-4 rounded-full bg-zinc-200/80 hover:bg-zinc-300/80 text-black hover:text-indigo-500 active:outline-none outline-indigo-500 aspect-square transition-all duration-300"
        onClick={() => scrollToSection(nextSection)}
        aria-label="Next Section"
      >
        <span className="text-xl sm:text-2xl text-inherit">&#8595;</span>
      </button>
    </div>
  );
}

export default Navigation;
