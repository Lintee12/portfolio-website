import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@remix-run/react";

interface Props {}

function Header(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full p-4 min-h-20 max-h-20 flex items-center z-10 bg-gradient-to-b from-white to-transparent backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-indigo-600">
          Evan Linton
        </Link>

        <nav className="hidden sm:flex space-x-4">
          <Link to="/#about" className="hover:text-indigo-600 font-semibold">
            About
          </Link>
          <Link to="/#skills" className="hover:text-indigo-600 font-semibold">
            Skills
          </Link>
          <Link to="/#projects" className="hover:text-indigo-600 font-semibold">
            Projects
          </Link>
          <Link to="/#contact" className="hover:text-indigo-600 font-semibold">
            Contact
          </Link>
        </nav>

        <button
          className="sm:hidden p-2 focus:outline-none relative z-50"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {isClient &&
        createPortal(
          <div
            className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 transition-transform duration-150 ease-in-out sm:hidden ${
              isMenuOpen
                ? "translate-y-0 opacity-100 pointer-events-none"
                : "translate-y-full opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isMenuOpen}
          >
            <button
              className="absolute top-4 right-4 p-2 text-gray-800 hover:text-black"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="flex flex-col items-center space-y-6 pointer-events-auto">
              <Link
                to="/#about"
                className="text-2xl hover:text-indigo-600 font-semibold"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/#skills"
                className="text-2xl hover:text-indigo-600 font-semibold"
                onClick={toggleMenu}
              >
                Skills
              </Link>
              <Link
                to="/#projects"
                className="text-2xl hover:text-indigo-600 font-semibold"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link
                to="/#contact"
                className="text-2xl hover:text-indigo-600 font-semibold"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}

export default Header;
