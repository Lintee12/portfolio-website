import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { remark } from "remark";
import remarkHtml from "remark-html";

type LoaderData = {
  id: string;
};

export async function loader({ params }: LoaderFunctionArgs): Promise<Response> {
  const { id } = params;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ id });
}

function Post() {
  const { id } = useLoaderData<LoaderData>();
  const [contentHtml, setContentHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(`/posts/${id}.md`);
        if (!response.ok) {
          throw new Error("Markdown file not found");
        }

        const markdown = await response.text();

        const processedContent = await remark().use(remarkHtml).process(markdown);
        const html = processedContent.toString();
        setContentHtml(html);
      } catch (err) {
        console.error("Error fetching markdown:", err);
        setError("Failed to load the post.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <article className="p-4 w-full mt-20">
      <div
        className="container mx-auto flex flex-col prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}

export default Post;
