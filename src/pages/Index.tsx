import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { sampleData } from "@/utils/sampleData";
import { CompanyLogo } from "@/components/CompanyLogo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const navigate = useNavigate();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredSamples = sampleData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ───────────── HERO ───────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6"
      >
        {/* Subtle grain / vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs uppercase tracking-[0.35em] text-muted-foreground"
          >
            Investometer — Intelligence for Investors
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
          >
            Clarity, in every
            <br />
            <span className="italic font-light text-muted-foreground">
              investment.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-xl text-base md:text-lg font-light leading-relaxed text-muted-foreground"
          >
            AI-driven analysis of listed equities and private ventures.
            Built for investors who value precision over noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="group h-12 rounded-full px-8 text-sm font-medium tracking-wide"
            >
              Analyze Stocks
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <button
              onClick={() => navigate("/analyze")}
              className="group inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              Analyze a startup
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-foreground/20 p-1">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-0.5 rounded-full bg-foreground/60"
            />
          </div>
        </motion.div>
      </section>

      {/* ───────────── STATEMENT ───────────── */}
      <section className="border-t border-border/60 px-6 py-32 md:py-40">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-light leading-[1.2] tracking-[-0.02em]"
          >
            We built Investometer to strip the noise from investment analysis.
            <span className="text-muted-foreground">
              {" "}Every score, every signal — grounded in data, refined by AI,
              distilled into a single, honest answer.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ───────────── PRODUCT PILLARS ───────────── */}
      <section className="border-t border-border/60 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 max-w-2xl"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Two disciplines. One platform.
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight">
              Public markets. Private ventures.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                eyebrow: "01 — Equities",
                title: "Analyze Listed Stocks",
                body: "Investibility scores and risk profiles for the top US equities, computed daily from live market data.",
                cta: "Browse reports",
                href: "/dashboard",
              },
              {
                eyebrow: "02 — Ventures",
                title: "Analyze a Startup",
                body: "Submit financials, team, and traction. Receive a founder-grade evaluation you can present in the room.",
                cta: "Start analysis",
                href: "/analyze",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 md:p-12 transition-all duration-500 hover:border-foreground/30"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full min-h-[320px] flex-col">
                  <p className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {card.eyebrow}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base font-light leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                  <div className="mt-auto pt-10">
                    <Link
                      to={card.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-foreground transition-all"
                    >
                      {card.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FEATURED REPORTS ───────────── */}
      <section className="border-t border-border/60 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex items-end justify-between gap-8"
          >
            <div className="max-w-xl">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Featured Analyses
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight">
                Selected reports.
              </h2>
            </div>
            <Link
              to="/dashboard"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-3">
            {featuredSamples.map((sample, i) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="group relative bg-card p-8 transition-colors duration-300 hover:bg-muted/40"
              >
                <Link to={`/analysis/${sample.id}`} className="block h-full">
                  <div className="flex items-start justify-between">
                    <CompanyLogo
                      symbol={sample.id}
                      companyName={sample.startupName}
                      size="md"
                    />
                    <span className="text-xs font-medium tracking-wider text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {sample.industry || "Technology"}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                      {sample.startupName}
                    </h3>
                  </div>

                  <div className="mt-10 flex items-end justify-between border-t border-border/60 pt-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Investibility
                      </p>
                      <p className="mt-1 text-3xl font-light tracking-tight">
                        {sample.investibilityScore}
                        <span className="text-base text-muted-foreground">/100</span>
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
            >
              View all reports
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── CLOSING CTA ───────────── */}
      <section className="border-t border-border/60 px-6 py-32 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.04em]"
          >
            Ready when
            <br />
            <span className="italic font-light text-muted-foreground">
              you are.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="group h-12 rounded-full px-8 text-sm font-medium tracking-wide"
            >
              Explore the platform
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Link
              to="/about"
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn more →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
