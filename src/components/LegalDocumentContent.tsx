import type { LegalBlock, LegalDocument } from "@/lib/legal";

function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed text-foreground/90">{block.text}</p>;
    case "h3":
      return (
        <h3 className="mt-5 text-base font-semibold text-foreground">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-foreground/90">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-foreground/[0.04]">
                <th className="px-4 py-3 font-semibold text-foreground">
                  {block.headers[0]}
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  {block.headers[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([left, right]) => (
                <tr
                  key={`${left}-${right}`}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-foreground/90">{left}</td>
                  <td className="px-4 py-3 text-foreground/90">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function LegalDocumentContent({ document }: { document: LegalDocument }) {
  return (
    <div className="space-y-8">
      {document.sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            {section.title}
          </h2>
          <div className="space-y-3">
            {section.blocks.map((block, index) => (
              <LegalBlockView key={`${section.title}-${index}`} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
