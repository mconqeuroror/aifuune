import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppleEmoji } from "@/components/AppleEmoji";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IMAGES } from "@/lib/content";
import type { EmojiName } from "@/lib/emoji-icons";
import {
  HALL_OF_FAME,
  JULY_LEADERBOARD,
  JUNE_TOP_3,
  OLYMPICS_LAST_UPDATED,
  OLYMPICS_MONTH,
  OLYMPICS_PREV_MONTH,
  type LeaderboardEntry,
} from "@/lib/olympics-content";
import { cn } from "@/lib/utils";

const medalStyles = {
  gold: {
    row: "glass-gold olympics-glow ring-amber-300/30",
    badge:
      "bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-amber-950 shadow-sm shadow-amber-200/50",
    place: "text-amber-700",
    avatarRing: "ring-amber-300/80",
  },
  silver: {
    row: "ring-zinc-300/40 bg-gradient-to-r from-zinc-50/90 via-white/60 to-white/40",
    badge:
      "bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 text-zinc-800 shadow-sm",
    place: "text-zinc-600",
    avatarRing: "ring-zinc-300/80",
  },
  bronze: {
    row: "ring-orange-300/35 bg-gradient-to-r from-orange-50/90 via-white/55 to-white/40",
    badge:
      "bg-gradient-to-br from-orange-200 via-orange-400 to-orange-600 text-orange-950 shadow-sm",
    place: "text-orange-700",
    avatarRing: "ring-orange-300/70",
  },
  "": {
    row: "hover:bg-white/40",
    badge: "bg-accent/10 text-accent ring-1 ring-accent/15",
    place: "text-muted",
    avatarRing: "ring-white/80",
  },
} as const;

const podiumMedals: Record<number, EmojiName> = {
  1: "first-medal",
  2: "second-medal",
  3: "third-medal",
};

function LeaderboardRow({
  entry,
  index,
}: {
  entry: LeaderboardEntry;
  index: number;
}) {
  const style = medalStyles[entry.medal];
  const isPodium = entry.rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        "glass group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 transition-colors sm:grid-cols-[3.25rem_1fr_7rem_5.5rem] sm:gap-4 sm:px-4 sm:py-3.5",
        style.row,
        isPodium && "sm:py-4",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm font-bold sm:size-10",
            style.badge,
          )}
        >
          {entry.rank}
        </div>
        {entry.rank === 1 && (
          <AppleEmoji name="crown" size={20} className="hidden sm:block" />
        )}
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <Avatar
          className={cn(
            "shrink-0 ring-2",
            isPodium ? "size-11 sm:size-12" : "size-9 sm:size-10",
            style.avatarRing,
          )}
        >
          <AvatarImage src={entry.avatar} alt={entry.name} />
          <AvatarFallback>{entry.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-left">
          <span className="block truncate font-semibold">{entry.name}</span>
          <span className={cn("text-xs font-medium sm:hidden", style.place)}>
            {entry.place}
          </span>
        </div>
      </div>

      <div className="font-display text-right text-base font-bold text-money sm:col-start-3">
        {entry.performance}
      </div>

      <div
        className={cn(
          "hidden text-right text-sm font-semibold sm:block",
          style.place,
        )}
      >
        {entry.place}
      </div>
    </motion.div>
  );
}

function SidebarRankItem({
  rank,
  name,
  amount,
  avatar,
}: {
  rank: number;
  name: string;
  amount: string;
  avatar: string;
}) {
  const medal = podiumMedals[rank];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/50 bg-white/45 px-3 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/60">
      {medal ? (
        <AppleEmoji name={medal} size={22} />
      ) : (
        <span className="w-5 text-center text-xs font-bold text-muted">
          {rank}
        </span>
      )}
      <Avatar className="size-9 ring-2 ring-white/80">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <span className="flex-1 truncate text-sm font-medium">{name}</span>
      <span className="font-display text-sm font-bold text-money">{amount}</span>
    </div>
  );
}

export default function OlympicsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-amber-200/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 size-80 rounded-full bg-accent/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-amber-100/20 blur-3xl"
      />

      <header className="sticky top-0 z-50 overflow-hidden rounded-b-2xl glass-header-scrolled">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img
              src={IMAGES.logo}
              alt="AI Fuňe"
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          <Badge className="gap-1.5 border-amber-200/50 bg-amber-50/80 px-3 py-1.5 text-amber-800">
            <AppleEmoji name="trophy" size={16} />
            Fune Olympics
          </Badge>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <AppleEmoji name="trophy" size={16} />
            Live leaderboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Fuňe{" "}
            <span className="text-gold-gradient font-display">Olympics</span>
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Rebríček výkonnosti AI fuň v komunite — aktualizovaný každý mesiac.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full glass px-2 py-1.5 shadow-sm">
            <button
              type="button"
              title={OLYMPICS_PREV_MONTH}
              className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/60 hover:text-accent"
              aria-label={OLYMPICS_PREV_MONTH}
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="min-w-[10rem] px-2 text-sm font-semibold text-accent sm:text-base">
              {OLYMPICS_MONTH}
            </p>
            <button
              type="button"
              disabled
              className="flex size-9 cursor-not-allowed items-center justify-center rounded-full text-muted/25"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px] lg:gap-8">
          <section className="glass rounded-3xl p-4 sm:p-5">
            <div className="mb-4 hidden grid-cols-[3.25rem_1fr_7rem_5.5rem] gap-4 border-b border-black/5 px-4 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted sm:grid">
              <span>Rank</span>
              <span>Name</span>
              <span className="text-right">Performance</span>
              <span className="text-right">Place</span>
            </div>
            <div className="space-y-2.5">
              {JULY_LEADERBOARD.map((entry, i) => (
                <LeaderboardRow key={entry.rank} entry={entry} index={i} />
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-gold rounded-2xl p-4 sm:p-5"
            >
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-800">
                <AppleEmoji name="chart-up" size={18} />
                June Top 3
              </h2>
              <div className="space-y-2.5">
                {JUNE_TOP_3.map((entry, i) => (
                  <SidebarRankItem
                    key={entry.name}
                    rank={i + 1}
                    name={entry.name}
                    amount={entry.amount}
                    avatar={entry.avatar}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-2xl p-4 sm:p-5"
            >
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent">
                <AppleEmoji name="trophy" size={18} />
                Hall of Fame
              </h2>
              <div className="space-y-2.5">
                {HALL_OF_FAME.map((entry) => (
                  <div
                    key={entry.name}
                    className="flex items-center gap-3 rounded-xl border border-white/50 bg-white/40 px-3 py-2.5 backdrop-blur-sm"
                  >
                    <Avatar className="size-9 ring-2 ring-amber-200/60">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-sm font-semibold">
                      {entry.name}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-sm font-bold text-amber-700">
                      {entry.wins}
                      <AppleEmoji name="trophy" size={14} />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
            Last updated: {OLYMPICS_LAST_UPDATED}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full glass px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-white/60"
          >
            ← Späť na hlavnú stránku
          </Link>
        </div>
      </main>
    </div>
  );
}
