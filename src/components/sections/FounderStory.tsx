import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { IMAGES } from "@/lib/content";

export function FounderStory() {
  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-sm leading-relaxed text-foreground/85 sm:text-base"
        >
          <p>
            Vždy som chcel byť bohatý. Skúsil som fakt veľa vecí: SMMA,
            Dropshipping, Trading, predaj tenisiek, tvorbu webstránok...
          </p>
          <p>
            Pred pár mesiacmi som skúsil AI fuňu. Videl som, že iným sa darí,
            tak prečo nie mne.
          </p>
          <p>
            Nemal som žiadne skúsenosti. Nevedel som, kde začať. Všetko som sa
            naučil za pochodu.
          </p>
          <p>
            Po 3 mesiacoch som prekročil{" "}
            <span className="font-display font-bold text-money">
              10 000 € mesačne
            </span>
            .
          </p>
          <p>
            Nie som žiaden biznis guru. Som 19-ročný chlapec, ktorý našiel
            príležitosť skôr než ostatní. V tomto videu ti ukážem presne, ako
            som na to prišiel.
          </p>
          <p className="font-medium text-foreground">— Mr. Byznys</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <img
            src={IMAGES.founderStory}
            alt="Mr. Byznys"
            className="w-full rounded-2xl object-cover shadow-xl ring-1 ring-black/5"
          />
          <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-sm font-medium shadow-md">
            <Avatar className="size-7">
              <AvatarImage src={IMAGES.founderStory} alt="Mr. Byznys" />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            Mr. Byznys
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 w-full max-w-3xl"
      >
        <Card className="glass">
          <CardContent className="p-6 text-center sm:p-8">
            <blockquote className="text-lg font-semibold leading-snug text-accent sm:text-xl">
              „Bez diplomu, bez návodu, len ja a môj notebook."
            </blockquote>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
