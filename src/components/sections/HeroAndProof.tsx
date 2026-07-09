import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AppleEmoji } from "@/components/AppleEmoji";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { HERO_PROOF_CARDS, IMAGES } from "@/lib/content";
import { assetUrl } from "@/lib/asset-base";

function Blob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-4 pt-2 sm:px-6 sm:pb-8 sm:pt-4"
    >
      <Blob className="left-1/4 top-8 size-64 bg-accent/10" />
      <Blob className="right-1/4 top-16 size-56 bg-cyan-300/15" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="pt-2 text-[1.4rem] font-bold leading-tight tracking-tight sm:pt-4 sm:text-3xl md:text-[2.35rem]"
        >
          Ako zarobiť{" "}
          <span className="font-display font-bold text-money">
            10 000 €+ mesačne
          </span>{" "}
          s AI fuňami
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base"
        >
          Ukážem ti presný postup. Od nuly až po prvé peniaze.
          <br />
          Celé zadarmo, žiadny háčik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-5"
        >
          <EmailCaptureForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 flex items-start justify-center gap-2 text-sm leading-relaxed text-foreground/80 sm:text-base"
        >
          <AppleEmoji name="gift" size={22} className="mt-0.5 shrink-0" />
          <span>
            Bonus: medzi prihlásenými rozdávame balík v hodnote{" "}
            <span className="font-medium text-money">4000+ €</span> — MacBook Air,
            iPhone 17 Pro, 500 € a týždeň koučingu so mnou.
          </span>
        </motion.p>

        <HeroProofStrip />
      </div>
    </section>
  );
}

function HeroProofStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="mt-5 text-left sm:mt-6"
    >
      <p className="mb-2.5 text-center text-[11px] font-medium text-muted sm:text-xs">
        1300+ členov · Online teraz · posledný sa pridal pred 10 min
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {HERO_PROOF_CARDS.map((card) => (
          <div
            key={card.src}
            className="overflow-hidden rounded-lg bg-zinc-900/95 p-1 shadow-md ring-1 ring-white/8"
          >
            <img
              src={card.src}
              alt={card.alt}
              width={320}
              height={240}
              decoding="async"
              fetchPriority="low"
              className="aspect-[4/3] w-full rounded-md object-cover object-top"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ProofCollage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [15, -25]);

  return (
    <section ref={ref} className="relative px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-[4/3] max-w-3xl sm:aspect-[16/10]"
        >
          <motion.div
            style={{ y: y1 }}
            className="absolute left-2 top-0 z-30 max-w-[220px] rounded-xl glass px-3 py-2 text-xs shadow-lg sm:left-6 sm:max-w-xs sm:text-sm"
          >
            Tatiana M. sa práve pridala <AppleEmoji name="wave" size={16} />
          </motion.div>

          <motion.img
            style={{ y: y2 }}
            src={IMAGES.aiExpert}
            alt="AI Expert"
            loading="lazy"
            decoding="async"
            className="absolute left-[8%] top-[12%] z-10 w-[42%] rounded-2xl object-cover shadow-2xl ring-2 ring-white/60 sm:w-[38%]"
          />

          <motion.img
            style={{ y: y3 }}
            src={IMAGES.proofSupport1}
            alt="Výsledok 1"
            loading="lazy"
            decoding="async"
            className="absolute right-[6%] top-[8%] z-20 w-[34%] rounded-xl object-cover shadow-xl ring-1 ring-white/50"
          />

          <motion.img
            style={{ y: y1 }}
            src={IMAGES.proofSupport3}
            alt="Výsledok 2"
            loading="lazy"
            decoding="async"
            className="absolute bottom-[10%] left-[4%] z-20 w-[30%] rounded-xl object-cover shadow-xl ring-1 ring-white/50"
          />

          <motion.img
            style={{ y: y2 }}
            src={assetUrl("/images/all-b64-14.png")}
            alt="Výsledok 3"
            loading="lazy"
            decoding="async"
            className="absolute bottom-[10%] right-[10%] z-10 w-[28%] rounded-xl object-cover shadow-lg ring-1 ring-white/40"
          />

          <motion.img
            style={{ y: y3 }}
            src={IMAGES.earningsProof}
            alt="Earnings dashboard"
            loading="lazy"
            decoding="async"
            className="absolute left-[28%] top-[26%] z-40 w-[46%] rounded-xl object-cover shadow-2xl ring-1 ring-white/10"
          />

          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-[4%] right-[4%] z-30 rounded-lg bg-[#313338] p-2 text-white shadow-xl"
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <div className="flex size-5 items-center justify-center rounded-full bg-[#5865F2] text-[8px] font-bold">
                AI
              </div>
              <div className="text-[10px] font-semibold">AI Fuňe</div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-1.5 py-px text-[9px] font-medium text-green-400">
                <span className="size-1 rounded-full bg-green-500" />
                Online teraz
              </span>
              <span className="rounded-full bg-white/10 px-1.5 py-px text-[9px] font-medium text-zinc-300">
                Členov 1300+
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
