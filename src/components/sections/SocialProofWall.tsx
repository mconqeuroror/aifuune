import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PROOF_SCREENSHOTS } from "@/lib/content";

function LazyProofCard({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="break-inside-avoid rounded-xl bg-zinc-900/95 p-1.5 shadow-lg ring-1 ring-white/8"
    >
      {visible ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-lg object-cover"
        />
      ) : (
        <div className="aspect-[4/3] w-full animate-pulse rounded-lg bg-zinc-800" />
      )}
    </motion.div>
  );
}

export function SocialProofWall() {
  return (
    <section className="bg-zinc-950 px-4 py-14 text-zinc-100 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Recenzie a výsledky ľudí z komunity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Narovinu - v komunite máme už{" "}
            <strong className="font-bold text-white">1300+ členov</strong> a kto
            šiel do akcie, držal sa mojich návodov, ten má výsledky. Nižšie si
            pozri pár screenshotov z našej Discord komunity. Všetko to sú bežní
            ľudia, ktorí to robili 1x v živote.
          </p>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {PROOF_SCREENSHOTS.map((shot, i) => (
            <div key={shot.alt} className="mb-4">
              <LazyProofCard src={shot.src} alt={shot.alt} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
