import { notFound } from "next/navigation";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import Button from "@/components/Button";

import OtherResources from "./OtherResources";

export interface Resource {
    /** Tile of the resource. */
    title: string;
    /** Markdown-formatted body of the resource. */
    body: string;
    /** Author of the resource. */
    author: string;
    /** Tags for the resource. */
    tags: readonly string[];
    /** The publish date of the resource, as epoch milliseconds. */
    date: number;
}

/**
 * Hardcoded resource list for development purposes.
 * Will be replaced with a real DB call when the time comes.
 */
const resources: Partial<Record<string, Resource>> = {
    example: {
        title: "Example Resource",
        author: "Arthur Dent",
        body: `# Markdown Test

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

1. foo
2. bar
3. baz

- item 1
  - subitem 1
- item 2

![Exploding head emoji](https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/exploding-head.webp)

> This is my blockquote.
> There are many like it, but this one is mine.

| Col 1 | Col 2 |
| ----- | ----- |
| Hello | World |
`,
        tags: ["Career", "Something Else"],
        date: 1740347743445,
    },
};

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 404 if the resource does not exist
    if (!(id in resources)) notFound();

    const resource = resources[id]!;
    const resourceBody = DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
        await marked(resource.body),
    );
    const resourceDate = new Date(resource.date);

    return (
        <>
            <div className="relative my-16 flex justify-center">
                <Button
                    variant="outline"
                    className="absolute left-72 top-0 font-heading uppercase"
                    href="/pages/ResourcesPage"
                >
                    Go Back
                </Button>
                <div className="flex min-w-[65ch] flex-col gap-32">
                    {/* Resource */}
                    <article>
                        {/* Tags */}
                        <div className="mb-2 flex gap-4 font-mono uppercase">
                            {resource.tags.map((tag, i) => (
                                <span key={i} className="fill-gradient p-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {/* Title, author, and date */}
                        <h1 className="font-heading text-4xl uppercase">{resource.title}</h1>
                        {resource.author && (
                            <p className="color-gradient font-mono text-lg">{resource.author}</p>
                        )}
                        <time className="text-md font-mono" dateTime={resourceDate.toISOString()}>
                            {resourceDate.toLocaleDateString()}
                        </time>
                        {/* Markdown-parsed body */}
                        <p
                            className="markdown"
                            dangerouslySetInnerHTML={{ __html: resourceBody }}
                        />
                    </article>
                    {/* Rating */}
                    <div className="outline-gradient flex min-w-[65ch] justify-between p-5">
                        <p className="font-heading uppercase">Is this resource helpful?</p>
                        <div className="flex gap-1 font-mono">
                            <a href="#">(thumbs up)</a>
                            <span>25</span>
                            <a href="#">(thumbs down)</a>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Other Resources */}
            <OtherResources />
        </>
    );
}
