import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { remark } from "remark";
import remarkHtml from "remark-html";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import { link } from "fs";

type LoaderData = {
  title: string;
  id: string;
  contentHtml: string;
  dateModified: string | null;
};

export async function loader({ params }: LoaderFunctionArgs): Promise<Response> {
  const { id } = params;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public/posts", `${id}.md`);
    const markdown = await fs.readFile(filePath, "utf-8");

    const { content, data } = matter(markdown);

    const processedContent = await remark().use(remarkHtml).process(content);
    const contentHtml = processedContent.toString();

    return json<LoaderData>({
      title: data.title || null,
      id,
      contentHtml,
      dateModified: data.dateModified || null,
    });
  } catch (err) {
    console.error("Error loading markdown:", err);
    throw new Response("Failed to load the post.", { status: 500 });
  }
}

export const meta: MetaFunction = ({ data }) => {
  const post: any = data;
  return [
    { title: post?.title || "Untitled Post" },
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
        <p className="text-gray-500 text-lg">{dateModified}</p>
        <div id="post" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  );
}

export default Post;
