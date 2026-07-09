import { Link, Navigate, useLocation } from "react-router-dom";
import { AmbientBlobs } from "@/components/AmbientBlobs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalDocumentContent } from "@/components/LegalDocumentContent";
import { getLegalDocument } from "@/lib/legal";

export default function LegalPage() {
  const { pathname } = useLocation();
  const document = getLegalDocument(pathname);

  if (!document) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AmbientBlobs
        blobs={[
          { className: "left-0 top-0 size-80 -translate-x-1/3 bg-accent/10" },
          { className: "right-0 top-24 size-64 translate-x-1/3 bg-cyan-300/15" },
        ]}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent"
        >
          ← Späť na hlavnú stránku
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {document.title}
        </h1>

        <div className="mt-8">
          <LegalDocumentContent document={document} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
