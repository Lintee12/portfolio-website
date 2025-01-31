import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FormEvent, useState } from "react";
import Button from "~/components/Button";
import Navigation from "~/components/Navigation";
import Skill from "~/components/Skill";
import SkillsAnimation from "~/components/SkillsAnimation";

export const meta: MetaFunction = () => {
  return [
    { title: "Evan Linton" },
    { name: "description", content: "Welcome to my portfolio website!" },
  ];
};

const skills = [
  {
    title: "Windows Server",
    description:
      "I can mange windows server environments and implement tools like DNS, and Active Directory.",
  },
  {
    title: "Network Configuration",
    description: "I can configure Cisco Routers and Switches to be secure and efficient.",
  },
  {
    title: "Command Line",
    description:
      "I can navigate an Operating Systems like Linux and Windows with command line, and write Scripts in Powershell.",
  },
  {
    title: "Building LAN's",
    description:
      "I can build local networks that allow easy communication between devices, utilizing VLAN and DHCP.",
  },
  {
    title: "Programming/Scripting",
    description:
      "I have been programming for years in languages like Javascript, C++, and Python. This is useful in any job involving IT.",
  },
  {
    title: "Network Documentation",
    description:
      "I create and maintain standard network diagrams, configurations, and troubleshooting procedures.",
  },
];

const projects = [
  {
    title: "Portfolio Website",
    description: "Created my portfolio website, to show off my skills and projects.",
    link: "/post/1",
  },
  {
    title: "Industry Research",
    description:
      "Some research ive done on the IT industry, specifically the Network Administration field.",
    link: "/post/2",
  },
];

export default function Index() {
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
          <div>
            <h1 className="text-6xl font-bold mb-4">
              Hi, I'm <span className="text-indigo-600">Evan Linton</span>
            </h1>
            <p className="text-xl text-zinc-700 max-w-2xl mx-auto">
              A skilled Network Administrator with a background in Programming and IT support. I am
              able to work efficiently in fast-paced, dynamic environments.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-40 bg-white min-h-screen flex items-center">
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
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-40 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">My Skills</h2>
            <div className="flex justify-center mb-8">
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
                    variant="secondary"
                    key={skill.title}
                    title={skill.title}
                    description={skill.description}
                  ></Skill>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-40 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">My Projects and Assignments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl justify-center gap-4 mx-auto">
              {projects.map((project) => {
                return (
                  <Skill
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
        </section>

        {/* Contact */}
        <section id="contact" className="py-40 min-h-screen">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded outline-none"
                  required
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  autoComplete="email"
                  type="email"
                  className="w-full p-2 border rounded outline-none"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Message</label>
                <textarea
                  className="w-full p-2 border rounded outline-none"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {error && <p className="text-red-500 text-center my-2">{error}</p>}
              {success && (
                <p className="text-indigo-500 text-center my-2">Message sent successfully!</p>
              )}

              <Button disabled={loading} className="w-full" type="submit">
                {loading ? "Sending..." : "Send"}
              </Button>
              <p className="mt-2 text-center">
                Or Email me directly:{" "}
                <Link className="text-indigo-500" to={"mailto:lintonevan@gmail.com"}>
                  lintonevan@gmail.com
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
      <Navigation></Navigation>
    </>
  );
}
