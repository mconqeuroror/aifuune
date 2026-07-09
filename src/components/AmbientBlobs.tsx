import { cn } from "@/lib/utils";

type BlobConfig = {
  className: string;
};

type AmbientBlobsProps = {
  blobs: BlobConfig[];
  className?: string;
};

/** Fixed decorative layer — keeps blur orbs from widening the document (Chrome left-gap bug). */
export function AmbientBlobs({ blobs, className }: AmbientBlobsProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {blobs.map((blob) => (
        <div
          key={blob.className}
          className={cn(
            "absolute rounded-full blur-3xl",
            blob.className,
          )}
        />
      ))}
    </div>
  );
}
