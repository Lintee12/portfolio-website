import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";
import * as cheerio from "cheerio";

type LoaderData = {
  title: string;
  id: string;
  contentHtml: string;
  dateModified: string;
};

export async function loader({ params }: LoaderFunctionArgs): Promise<Response> {
  const { id } = params;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public/posts", `${id}.docx`);
    const fileBuffer = await fs.readFile(filePath);

    const stats = await fs.stat(filePath);
    const dateModified = stats.mtime.toISOString();

    const { value: contentHtml } = await mammoth.convertToHtml({ buffer: fileBuffer });

    const $ = cheerio.load(contentHtml);
    const title = $("h1").first().text().trim() || "Untitled Post";

    return json({
      title,
      id,
      contentHtml,
      dateModified,
    });
  } catch (err) {
    console.error("Error loading DOCX:", err);
    throw new Response("Failed to load the post.", { status: 500 });
  }
}

export const meta: MetaFunction = ({ data }) => {
  const post: any = data;
  return [
    { title: post.title },
    { name: "description", content: "Welcome to my portfolio website!" },
  ];
};

function Post() {
  const { id, contentHtml, dateModified } = useLoaderData<LoaderData>();

  useEffect(() => {
    const links = document.getElementById("post")?.querySelectorAll("a");

    links?.forEach((link) => {
      link.setAttribute("target", "_blank");
    });
  }, []);

  return (
    <article className="p-4 w-full mt-20 min-h-screen">
      <div className="container mx-auto flex flex-col prose lg:prose-xl">
        <p className="text-gray-500 text-lg hidden">
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(dateModified))}
        </p>
        <div id="post" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  );
}

export default Post;
