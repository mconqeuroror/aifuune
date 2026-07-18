import { motion } from "framer-motion";
import { AppleEmoji } from "@/components/AppleEmoji";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { Card, CardContent } from "@/components/ui/card";
import { BENEFITS } from "@/lib/content";

function BenefitLine({ icon, text }: { icon: (typeof BENEFITS)[0]["icon"]; text: string }) {
  return (
    <p className="flex items-start gap-2.5 text-sm font-medium leading-snug sm:text-base">
      <AppleEmoji name={icon} size={22} className="mt-0.5" />
      <span>{text}</span>
    </p>
  );
}

export function BenefitGrid() {
  const gridItems = BENEFITS.slice(0, 6);
  const fullWidth = BENEFITS[6];

  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-2xl font-bold sm:text-3xl"
        >
          Čo sa dozvieš vo videu?
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gridItems.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Card className="glass card-lift h-full">
                <CardContent className="p-5">
                  <BenefitLine icon={item.icon} text={item.text} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {fullWidth && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="mt-4"
          >
            <Card className="glass card-lift">
              <CardContent className="p-5">
                <BenefitLine icon={fullWidth.icon} text={fullWidth.text} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function EmailCaptureSection() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xl">
        <EmailCaptureForm />
      </div>
    </section>
  );
}
