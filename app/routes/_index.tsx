import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Button from "~/components/Button";
import Navigation from "~/components/Navigation";
import ScrollFade from "~/components/ScrollFade";
import Skill from "~/components/Skill";
import SkillsAnimation from "~/components/SkillsAnimationV2";

export const meta: MetaFunction = () => {
  return [
    { title: "Evan Linton" },
    { name: "description", content: "Welcome to my portfolio website!" },
  ];
};

const skills = [
  {
    img: "https://computernewb.com/w/images/cn_wiki/3/3e/Windows_Server_Logo.png",
    title: "Windows Server",
    description:
      "I can mange windows server environments and implement tools like DNS, and Active Directory.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/17389/17389201.png",
    title: "Network Configuration",
    description: "I can configure Cisco Routers and Switches to be secure and efficient.",
  },
  {
    img: "https://static.thenounproject.com/png/4118837-200.png",
    title: "Command Line",
    description:
      "I can navigate an Operating Systems like Linux and Windows with command line, and write Scripts in Powershell.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/4263/4263937.png",
    title: "Building LAN's",
    description:
      "I can build local networks that allow easy communication between devices, utilizing VLAN and DHCP.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    title: "Programming/Scripting",
    description:
      "I have been programming for years in languages like Javascript, C++, and Python. This is useful in any job involving IT.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/14400/14400118.png ",
    title: "Network Documentation",
    description:
      "I create and maintain standard network diagrams, configurations, and troubleshooting procedures.",
  },
];

const projects = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/8644/8644474.png",
    title: "Portfolio Website",
    description: "Created my portfolio website, to show off my skills and projects.",
    link: "/post/1",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1055/1055645.png",
    title: "Industry Research",
    description:
      "Some research i've done on the IT industry, specifically the Network Administration field.",
    link: "/post/2",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("There was an error with your submission");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero */}
        <section id="hero" className="h-screen flex items-center justify-center text-center">
          <ScrollFade>
            <div className="p-4 prose">
              <h1 className="text-6xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="from-indigo-500 to-violet-500 bg-gradient-to-r bg-clip-text text-transparent">
                  Evan
                </span>
              </h1>
              <p className="text-xl text-zinc-700 max-w-2xl mx-auto">
                An aspiring Network Administrator currently attending{" "}
                <Link target="_blank" to={"https://nbcc.ca"}>
                  NBCC
                </Link>
                . I am able to work efficiently in fast-paced, dynamic environments.
              </p>
              <div className="flex gap-2 mt-4 w-full justify-center">
                <Link
                  className="bg-indigo-500 hover:bg-indigo-600 p-3 px-5 rounded shadow text-white no-underline"
                  to={"#projects"}
                >
                  My Projects
                </Link>
                <Link
                  className="bg-white hover:bg-zinc-100 p-3 px-5 rounded shadow no-underline"
                  to={"/documents"}
                >
                  My Documents
                </Link>
              </div>
            </div>
          </ScrollFade>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-40 bg-white min-h-screen flex items-center justify-center"
        >
          <ScrollFade>
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
              <p className="text-xl text-zinc-700 max-w-2xl mx-auto">
                I'm currently a student enrolled in the Network Administration Program at NBCC. I
                enjoy building and managing projects, solving problems with creativity, and learning
                new things.
                <br></br>
                <br></br>
                My goal is to become a professional Network Administrator and build a successful
                career out of it.
              </p>
            </div>
          </ScrollFade>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-40 min-h-screen flex items-center justify-center">
          <ScrollFade>
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center">My Skills</h2>
              <div className="flex justify-center mb-4">
                <SkillsAnimation
                  skills={[
                    "Communication",
                    "Teamwork",
                    "Adaptability",
                    "Problem Solving",
                    "Efficiency",
                    "Creativity",
                    "Time Management",
                    "Collaboration",
                    "Work Ethic",
                    "Motivation",
                    "Flexibility",
                    "Critical Thinking",
                    "Listening",
                    "Decision Making",
                  ]}
                ></SkillsAnimation>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl justify-center gap-4 mx-auto">
                {skills.map((skill) => {
                  return (
                    <Skill
                      img={skill.img}
                      variant="secondary"
                      key={skill.title}
                      title={skill.title}
                      description={skill.description}
                    ></Skill>
                  );
                })}
              </div>
            </div>
          </ScrollFade>
        </section>

        {/* Projects */}
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
                    ></Skill>
                  );
                })}
              </div>
            </div>
          </ScrollFade>
        </section>

        {/* Contact */}
        <section id="contact" className="py-40 min-h-screen bg-gray-50">
          <ScrollFade>
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Contact Me</h2>
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 text-lg font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    value={name}
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-lg font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-lg font-semibold text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                {error && (
                  <div className="text-red-600 bg-red-100 p-3 rounded-lg text-center my-4">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-green-600 bg-green-100 p-3 rounded-lg text-center my-4">
                    Message sent successfully! I will email you back shortly.
                  </div>
                )}

                <Button disabled={loading} type="submit">
                  {loading ? (
                    <span className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M4 12a8 8 0 1 1 8 8"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send"
                  )}
                </Button>

                <div className="flex gap-4 items-center justify-center mt-6">
                  <Link
                    title="Email"
                    to={"mailto:lintonevan@gmail.com"}
                    className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-700 hover:text-indigo-500 hover:rotate-12 transition-all"
                  >
                    <SiGmail className="w-full h-full" />
                  </Link>
                  <Link
                    title="LinkedIn"
                    target="_blank"
                    to={"https://www.linkedin.com/in/evan-linton-04b170294/"}
                    className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-700 hover:text-indigo-500 hover:rotate-12 transition-all"
                  >
                    <FaLinkedin className="w-full h-full" />
                  </Link>
                  <Link
                    title="GitHub"
                    target="_blank"
                    to={"https://github.com/Lintee12"}
                    className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-700 hover:text-indigo-500 hover:rotate-12 transition-all"
                  >
                    <FaGithub className="w-full h-full" />
                  </Link>
                </div>
              </form>
            </div>
          </ScrollFade>
        </section>
      </div>
      <Navigation></Navigation>
    </>
  );
}
