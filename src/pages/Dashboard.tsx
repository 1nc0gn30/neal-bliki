import { Link } from "react-router-dom";
import { ArrowRight, Check, ExternalLink, MapPin, Zap, Calendar, Shield, Rocket } from "lucide-react";

import data from "@/data.json";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { MorphingText } from "@/components/magicui/morphing-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

function StatValue({ raw }: { raw: string }) {
  const isCurrency = raw.startsWith("$");
  const numeric = parseInt(raw.replace(/\D/g, ""), 10);

  return (
    <span className="inline-flex items-baseline text-[#111111]">
      {isCurrency ? "$" : ""}
      <NumberTicker value={numeric} className="text-[#111111]" />
      {!isCurrency && raw.includes("+") ? "+" : ""}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-18 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <BlurFade inView delay={0.05}>
            <div className="editorial-kicker mb-8 inline-flex items-center gap-2 rounded-full border border-black/15 bg-[#4285f4]/10 px-4 py-1.5 font-medium text-[#1f4db3]">
              <MapPin className="h-3.5 w-3.5" />
              Virginia Beach Web Development
            </div>
          </BlurFade>

          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-4 text-4xl leading-[1.06] font-bold tracking-tight text-[#111111] sm:text-5xl md:text-6xl"
          >
            Your business deserves a website that actually works
          </TextAnimate>

          <BlurFade inView delay={0.1}>
            <MorphingText
              texts={["Findable.", "Bookable.", "Memorable.", "Fast."]}
              className="mb-6 h-12 text-3xl md:h-16 md:text-5xl"
            />
          </BlurFade>

          <BlurFade inView delay={0.14}>
            <p className="text-uplift mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#374151] md:text-xl">
              I design and build websites with <strong>clear offers</strong>, <em>strong local SEO</em>, and
              editorial typography that makes your message <Highlighter color="rgba(52,168,83,0.28)">stand out</Highlighter>.
            </p>
          </BlurFade>

          <BlurFade inView delay={0.18} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/offerings">
              <ShimmerButton className="font-medium" shimmerColor="#ea4335">
                See What I Offer
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-[#111111] transition-colors hover:bg-black/6"
            >
              Read My Story
            </Link>
          </BlurFade>

          <BlurFade inView delay={0.22}>
            <a
              href="https://join.netlify.com/d8a2zdtel9gy-w6zrwt"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#4285F4]/20 bg-[#4285F4]/5 px-4 py-2 text-xs font-medium text-[#4285F4] transition-colors hover:bg-[#4285F4]/10"
            >
              <Shield className="h-3.5 w-3.5" /> Netlify Partner — deploy your next site free
              <Rocket className="h-3.5 w-3.5" />
            </a>
          </BlurFade>
        </div>
      </section>

      <section className="border-y border-black/10 bg-black/[0.02] py-4">
        <Marquee pauseOnHover className="[--duration:30s]">
          {[...data.homepage.tech_marquee].map((tech, i) => (
            <span
              key={`tech-${i}`}
              className="mx-3 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium tracking-widest text-[#374151] uppercase"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: ["#4285f4", "#ea4335", "#fbbc05", "#34a853"][i % 4],
                }}
              />
              {tech}
            </span>
          ))}
        </Marquee>
      </section>

      <section className="px-6 py-20">
        <BlurFade inView>
          <MagicCard className="mx-auto max-w-4xl p-8 md:p-12">
            <p className="editorial-kicker mb-4 text-[#6b7280]">Proof of Work</p>
            <h2 className="text-uplift mb-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
              <Highlighter color="rgba(66,133,244,0.26)">{data.homepage.proof_banner.headline}</Highlighter>
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4b5563]">
              {data.homepage.proof_banner.description}
            </p>

            <div className="mb-8 grid grid-cols-3 gap-6">
              {data.homepage.proof_banner.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold md:text-4xl">
                    <StatValue raw={stat.value} />
                  </div>
                  <div className="mt-1 text-sm text-[#6b7280]">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href={data.homepage.proof_banner.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-black/6"
            >
              View the Project
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </MagicCard>
        </BlurFade>
      </section>

      <section className="bg-black/[0.02] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-16 text-center">
              <p className="editorial-kicker mb-3 text-[#6b7280]">How It Works</p>
              <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
                Simple process, {" "}
                <AnimatedGradientText colorFrom="#4285f4" colorTo="#34a853" className="text-stroke-soft">
                  real results
                </AnimatedGradientText>
              </h2>
            </div>
          </BlurFade>

          <div className="grid gap-8 md:grid-cols-3">
            {data.homepage.process_steps.map((step, i) => (
              <div key={step.number}>
                <BlurFade inView delay={i * 0.07}>
                  <MagicCard className="h-full p-6">
                    <div className="mb-4 text-5xl font-bold text-black/15">{step.number}</div>
                    <h3 className="mb-2 text-xl font-semibold text-[#111111]">{step.title}</h3>
                    <p className="leading-relaxed text-[#4b5563]">{step.description}</p>
                  </MagicCard>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-12 text-center">
              <div className="editorial-kicker mb-4 inline-flex items-center gap-2 rounded-full border border-[#ea4335]/25 bg-[#ea4335]/8 px-4 py-1.5 font-medium text-[#c5221f]">
                <Calendar className="h-3.5 w-3.5" />
                Limited Time — Available Until September
              </div>
              <h2 className="text-uplift mb-4 text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">
                I build fast, intelligent websites that actually work—powered by AI and built to convert.
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-[#4b5563]">
                Choose the tier that matches where you are. Every option ships fast and sells results, not just features.
              </p>
            </div>
          </BlurFade>

          <div className="relative">
            <div className="grid gap-6 blur-sm md:grid-cols-2">
              {[
                {
                  tier: "Starter",
                  price: "$20",
                  hook: "Get online TODAY",
                  deliverable: "1-page site, deployed",
                  color: "#4285f4",
                },
                {
                  tier: "Launch",
                  price: "$50",
                  hook: "Look legit instantly",
                  deliverable: "Multi-section landing page + branding",
                  color: "#34a853",
                },
                {
                  tier: "Growth",
                  price: "$100",
                  hook: "Start getting found",
                  deliverable: "SEO setup + analytics + optimization",
                  color: "#fbbc05",
                },
                {
                  tier: "Authority",
                  price: "$250",
                  hook: "Automate & scale",
                  deliverable: "AI integrations + advanced UX + automation",
                  color: "#ea4335",
                },
              ].map((item, i) => (
                <div key={item.tier}>
                  <BlurFade inView delay={i * 0.06}>
                    <MagicCard className="h-full p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-semibold tracking-wide text-[#6b7280] uppercase">
                            {item.tier}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-[#111111]">{item.price}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-[#111111]">{item.hook}</h3>
                      <p className="mb-4 text-[#4b5563]">{item.deliverable}</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Fast turnaround</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Netlify-native deploy</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-[#374151]">
                          <Zap className="mt-0.5 h-4 w-4 shrink-0" style={{ color: item.color }} />
                          <span>Real working product, not a mockup</span>
                        </li>
                      </ul>
                    </MagicCard>
                  </BlurFade>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#111111]/15 bg-[#111111] px-4 py-2 text-sm font-semibold text-white">
                <Calendar className="h-4 w-4" />
                All spots are filled for this special
              </div>
              <p className="mb-6 max-w-md text-center text-[#4b5563]">
                These intro tiers sold out. See current service packages with realistic pricing and real deliverables.
              </p>
              <Link to="/offerings">
                <ShimmerButton className="font-medium" shimmerColor="#4285f4">
                  View Services & Pricing
                  <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <MagicCard className="p-8 md:p-12">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="flex-1">
                  <p className="editorial-kicker mb-3 text-[#6b7280]">Featured Service</p>
                  <h2 className="text-uplift mb-2 text-3xl font-bold tracking-tight text-[#111111]">
                    {data.business_context.offerings[0].name}
                  </h2>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fbbc05]/18 px-3 py-1 text-sm font-semibold text-[#7a5a00]">
                    {data.business_context.offerings[0].price_usd}
                  </div>
                  <ul className="space-y-3">
                    {data.business_context.offerings[0].features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#374151]">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34a853]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:text-right">
                  <Link to="/offerings">
                    <ShimmerButton className="font-medium" shimmerColor="#34a853">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </MagicCard>
          </BlurFade>
        </div>
      </section>

      <section className="bg-black/[0.02] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="editorial-kicker mb-3 text-[#6b7280]">Live Builds</p>
                <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111]">
                  Things I&apos;m shipping right now
                </h2>
              </div>
              <Link
                to="/builds"
                className="hidden text-sm font-medium text-[#4285f4] hover:underline sm:block"
              >
                View all builds →
              </Link>
            </div>
          </BlurFade>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Hot App Summer Wisdom Library", url: "https://hotappsummer-wisdom.netlify.app", kind: "Challenge", accent: "#a3e635", stat: "233 apps indexed" },
              { name: "CreatorPlaybooks", url: "https://creatorplaybooks.netlify.app", kind: "Product", accent: "#d946ef", stat: "34 creator playbooks" },
              { name: "100 Websites Season 2", url: "https://100websitesin30days.nealfrazier.tech", kind: "Tracker", accent: "#34a853", stat: "125+ shipped" },
            ].map((b, i) => (
              <BlurFade inView delay={i * 0.05} key={b.name}>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl border border-black/10 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.05]"
                >
                  <span
                    className="mb-4 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: b.accent, background: `${b.accent}14` }}
                  >
                    {b.kind}
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-[#111111]">{b.name}</h3>
                  <p className="mt-2 text-xs font-medium text-[#6b7280]">{b.stat}</p>
                </a>
              </BlurFade>
            ))}
          </div>

          <Link
            to="/builds"
            className="mt-6 inline-flex text-sm font-medium text-[#4285f4] hover:underline sm:hidden"
          >
            View all builds →
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <BlurFade inView>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="editorial-kicker mb-3 text-[#6b7280]">From the Blog</p>
                <h2 className="text-uplift text-3xl font-bold tracking-tight text-[#111111]">Latest stories</h2>
              </div>
              <Link to="/blog" className="hidden text-sm font-medium text-[#4285f4] hover:underline sm:block">
                View all →
              </Link>
            </div>
          </BlurFade>

          <div className="grid gap-6 md:grid-cols-3">
            {data.blog_stories.posts.map((post, i) => (
              <div key={post.id}>
                <BlurFade inView delay={i * 0.06}>
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <MagicCard className="h-full p-6">
                      <time className="text-xs font-medium tracking-wide text-[#6b7280] uppercase">{post.date}</time>
                      <h3 className="mt-2 mb-3 text-lg leading-snug font-semibold text-[#111111] transition-colors hover:text-[#ea4335]">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-[#4b5563]">{post.content_summary}</p>
                    </MagicCard>
                  </Link>
                </BlurFade>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
