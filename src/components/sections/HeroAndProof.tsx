import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AppleEmoji } from "@/components/AppleEmoji";
import { DiscordIcon } from "@/components/DiscordIcon";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { HERO_PROOF_CARDS, IMAGES } from "@/lib/content";
import { assetUrl } from "@/lib/asset-base";
import { cn } from "@/lib/utils";

function HeroDecorImage({
  src,
  width,
  height,
  className,
  objectPosition = "object-center",
  rotateClassName,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  objectPosition?: string;
  rotateClassName?: string;
}) {
  return (
    <div className={cn("absolute", rotateClassName, className)}>
      <div className="size-full overflow-hidden rounded-2xl shadow-xl">
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          decoding="async"
          className={cn("size-full object-cover", objectPosition)}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-env(safe-area-inset-top,0px)-3.5rem)] flex-col justify-center px-3 py-4 sm:min-h-[calc(100svh-env(safe-area-inset-top,0px)-4rem)] sm:px-6 sm:py-6"
    >
      <div className="relative mx-auto w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-3 h-44 w-full max-w-sm overflow-visible sm:mb-4 sm:h-52 sm:max-w-md md:h-56 md:max-w-xl"
          aria-hidden
        >
          <HeroDecorImage
            src={IMAGES.aiExpert}
            width={320}
            height={427}
            rotateClassName="-rotate-6"
            className="bottom-0 left-0 z-0 h-[7.5rem] w-[6.5rem] sm:h-36 sm:w-[8.25rem] md:h-40 md:w-36"
          />
          <HeroDecorImage
            src={IMAGES.heroFerrariSelfie}
            width={400}
            height={400}
            className="bottom-0 left-1/2 z-10 h-[11rem] w-[8.25rem] -translate-x-1/2 sm:h-[13.5rem] sm:w-40 md:h-60 md:w-44"
          />
          <HeroDecorImage
            src={IMAGES.heroBgResult}
            width={400}
            height={180}
            objectPosition="object-[18%_30%] sm:object-[16%_28%] md:object-[14%_26%]"
            rotateClassName="origin-bottom-right rotate-6"
            className="bottom-0 right-0 z-0 h-[7rem] w-[7.5rem] sm:right-2 sm:h-[8.75rem] sm:w-[10.5rem] md:right-4 md:h-36 md:w-48"
          />
        </motion.div>

        <div className="overflow-visible pt-2 sm:pt-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="overflow-visible px-1 text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:px-2 sm:text-4xl md:text-[2.85rem]"
          >
            Ako zarobiť{" "}
            <span className="font-display inline-block pl-1.5 pr-0.5 font-bold tracking-normal text-money text-money-glow">
              10 000 €+ mesačne
            </span>{" "}
            s AI fuňami
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-3 text-xs leading-relaxed text-foreground/80 sm:text-sm"
          >
            Ukážem ti presný postup. Od nuly až po prvé peniaze.
            <br />
            Celé zadarmo, žiadny háčik.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative mt-5"
        >
          <EmailCaptureForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 flex items-start justify-center gap-2 px-1 text-sm leading-relaxed text-foreground/80 sm:mt-4 sm:px-0 sm:text-base"
        >
          <AppleEmoji name="gift" size={22} className="mt-0.5 shrink-0" />
          <span>
            Bonus: medzi prihlásenými rozdávame balík v hodnote{" "}
            <span className="font-medium text-money text-money-glow">4000+ €</span> — MacBook Air,
            iPhone 17 Pro, 500 € a týždeň koučingu so mnou.
          </span>
        </motion.p>
      </div>
    </section>
  );
}

export function MemberResultsSection() {
  return (
    <section id="vysledky-clenov" className="px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl"
        >
          Výsledky členov
        </motion.h2>

        <MemberResultsGrid />
      </div>

      <ProofCollage />
    </section>
  );
}

function MemberResultsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="text-left"
    >
      <p className="mb-2.5 text-center text-xs font-medium text-muted">
        1300+ členov · Online teraz · posledný sa pridal pred 10 min
      </p>
      <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-3 sm:gap-3">
        {HERO_PROOF_CARDS.map((card, index) => (
          <div
            key={card.src}
            className={cn(
              "overflow-hidden rounded-lg bg-zinc-900/95 p-1 shadow-md ring-1 ring-white/8",
              index === 2 &&
                "col-span-2 w-[calc((100%-0.5rem)/2)] justify-self-center min-[480px]:col-span-1 min-[480px]:w-auto min-[480px]:justify-self-stretch",
            )}
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [15, -25]);

  return (
    <div ref={ref} className="relative px-4 py-8 sm:px-6 sm:py-14">
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
            className="absolute bottom-[16%] right-[20%] z-20 w-[42%] rounded-xl object-cover shadow-lg ring-1 ring-white/40 sm:bottom-[10%] sm:right-[10%] sm:w-[28%]"
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
            className="absolute bottom-[2%] right-[2%] z-30 w-[72px] rounded-md bg-[#313338] p-1 text-white shadow-lg sm:bottom-[4%] sm:right-[4%] sm:w-auto sm:max-w-none sm:rounded-lg sm:p-2 sm:shadow-xl"
          >
            <div className="mb-0.5 flex items-center gap-1 sm:mb-1.5 sm:gap-1.5">
              <div className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-[#5865F2] text-white sm:size-5">
                <DiscordIcon className="size-2.5 sm:size-3" />
              </div>
              <div className="truncate text-[8px] font-semibold leading-none sm:text-[10px]">
                AI Fuňe
              </div>
            </div>
            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              <span className="inline-flex items-center gap-0.5 rounded-full bg-green-500/15 px-1 py-px text-[7px] font-medium leading-none text-green-400 sm:gap-1 sm:px-1.5 sm:text-[9px]">
                <span className="size-0.5 rounded-full bg-green-500 sm:size-1" />
                Online
              </span>
              <span className="rounded-full bg-white/10 px-1 py-px text-[7px] font-medium leading-none text-zinc-300 sm:px-1.5 sm:text-[9px]">
                1300+
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
