import { Lightbulb, Quote } from "lucide-react";
import type { ContentBlock } from "@/content/types";

/** Renders structured article content without any raw HTML. */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-ara">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "heading":
            return <h2 key={key}>{block.text}</h2>;
          case "subheading":
            return <h3 key={key}>{block.text}</h3>;
          case "list":
            return block.ordered ? (
              <ol key={key}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={key}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={key} className="relative rounded-2xl bg-midnight p-6 text-white sm:p-8">
                <Quote aria-hidden="true" className="size-6 text-cyan" />
                <blockquote className="mt-3 font-display text-xl leading-snug font-semibold">{block.text}</blockquote>
                {block.cite ? <figcaption className="mt-3 text-sm text-white/70">— {block.cite}</figcaption> : null}
              </figure>
            );
          case "callout":
            return (
              <div key={key} className="rounded-2xl border-l-4 border-macaw bg-macaw/10 p-5">
                {block.title ? (
                  <p className="flex items-center gap-2 font-bold text-midnight">
                    <Lightbulb aria-hidden="true" className="size-4 text-macaw-600" />
                    {block.title}
                  </p>
                ) : null}
                <p className={block.title ? "mt-1.5" : undefined}>{block.text}</p>
              </div>
            );
          default:
            return <p key={key}>{block.text}</p>;
        }
      })}
    </div>
  );
}
