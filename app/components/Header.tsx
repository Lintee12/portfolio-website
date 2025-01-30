import { Link } from "@remix-run/react";
import React from "react";

interface Props {}

function Header(props: Props) {
  return (
    <header>
      <nav className="fixed w-full p-4 min-h-20 max-h-20 flex pointer-events-none sm:pointer-events-auto transition-all items-center z-10 bg-gradient-to-b from-white to-transparent">
        <div className="container mx-auto flex justify-between items-center opacity-0 sm:opacity-100">
          <Link to="#" className="text-2xl font-bold hover:text-indigo-600">
            Evan Linton
          </Link>
          <ul className="space-x-4 hidden sm:flex">
            <li>
              <Link to="#about" className="hover:text-indigo-600 font-semibold">
                About
              </Link>
            </li>
            <li>
              <Link to="#skills" className="hover:text-indigo-600 font-semibold">
                Skills
              </Link>
            </li>
            <li>
              <Link to="#projects" className="hover:text-indigo-600 font-semibold">
                Projects
              </Link>
            </li>
            <li>
              <Link to="#contact" className="hover:text-indigo-600 font-semibold">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
