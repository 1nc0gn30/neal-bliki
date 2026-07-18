import { ArrowRight, Check, Zap, TrendingUp, Megaphone, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import data from "@/data.json";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Highlighter } from "@/components/magicui/highlighter";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function Offerings() {
  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <p className="editorial-kicker mb-3 text-[#6b7280]">Services</p>
          <TextAnimate
            as="h1"
            by="word"
            animation="blurInUp"
            className="text-uplift mb-4 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl"
          >
            Work with me
          </TextAnimate>
          <p className="text-lg leading-relaxed text-[#4b5563]">
            <Highlighter color="rgba(52,168,83,0.26)">{data.business_context.description}</Highlighter>
          </p>
        </header>
        {/* Business Leads & Advertising Banner */}
        <BlurFade inView>
          <MagicCard className="relative mb-12 overflow-hidden border-[#EA4335]/20 bg-gradient-to-br from-[#EA4335]/5 to-white p-8 md:p-10">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#EA4335]/10 blur-2xl" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#EA4335]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EA4335]">
                  <Megaphone className="h-3.5 w-3.5" />
                  Local Leads
                </div>
                <h2 className="text-uplift mb-3 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                  I get you business leads in the 757 with targeted advertising
                </h2>
                <p className="max-w-lg text-[#4b5563]">
                  Paid ads that actually convert. I set up, manage, and optimize campaigns
                  so local Hampton Roads businesses stop burning budget and start booking real clients.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Link
                  to="/contact?context=Advertising%20%26%20Business%20Leads"
                  className="inline-flex"
                >
                  <ShimmerButton className="font-medium" shimmerColor="#EA4335">
                    Get Leads Now <TrendingUp className="h-4 w-4" />
                  </ShimmerButton>
                </Link>
                <p className="text-center text-xs text-[#9ca3af] md:text-right">
                  Google Ads, Meta, local retargeting
                </p>
              </div>
            </div>
          </MagicCard>
        </BlurFade>


        {data.business_context.offerings.map((offering, i) => (
          <div key={offering.id}>
            <BlurFade inView delay={i * 0.06}>
              <MagicCard className="relative mb-12 overflow-hidden p-8 md:p-12">
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-uplift mb-3 text-3xl font-bold tracking-tight text-[#111111]">
                      {offering.name}
                    </h2>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#FBBC05]/20 px-4 py-1.5 text-sm font-semibold text-[#FBBC05]">
                      {offering.price_usd}
                    </div>
                  </div>
                  <Link to={`/contact?context=${encodeURIComponent(`Interested in ${offering.name}`)}`}>
                    <ShimmerButton className="font-medium" shimmerColor="#34a853">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </ShimmerButton>
                  </Link>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="editorial-kicker mb-5 text-[#6b7280]">What&rsquo;s Included</h3>
                    <ul className="space-y-4">
                      {offering.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#374151]">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#34A853]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="editorial-kicker mb-5 text-[#6b7280]">Powered By</h3>
                    <div className="space-y-3">
                      {offering.related_wiki_nodes.map((nodeId) => {
                        const node = data.wiki_nodes.entities.find((n) => n.id === nodeId);
                        if (!node) return null;

                        return (
                          <Link
                            key={nodeId}
                            to={`/wiki/${nodeId}`}
                            className="group block rounded-xl border border-black/10 bg-black/[0.02] p-4 transition-colors hover:bg-black/[0.04]"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium text-[#111111] transition-colors group-hover:text-[#4285F4]">
                              <Zap className="h-3.5 w-3.5 text-[#EA4335]" /> {node.title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          </div>
        ))}

        <section>
          <h2 className="text-uplift mb-6 text-center text-2xl font-bold tracking-tight text-[#111111]">Case Studies</h2>
          <div className="grid gap-4">
            {data.business_context.case_studies.map((study, i) => {
              const post = data.blog_stories.posts.find((p) => p.id === study.related_post_id);

              return (
                <div key={i}>
                  <BlurFade inView delay={i * 0.06}>
                    <MagicCard className="p-6 md:p-7">
                      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="mb-1 text-sm font-medium text-[#4285F4]">Client</div>
                            <h3 className="text-xl leading-tight font-semibold text-[#111111]">{study.client}</h3>
                            <p className="mt-1 text-sm text-[#6b7280]">
                              {study.service_used} · {study.time_to_launch}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <p className="text-sm leading-relaxed text-[#4b5563]">
                              <span className="font-semibold text-[#111111]">Pain point: </span>
                              {study.pain_point}
                            </p>
                            <p className="text-sm leading-relaxed text-[#4b5563]">
                              <span className="font-semibold text-[#111111]">What I changed: </span>
                              {study.neal_action}
                            </p>
                            <p className="text-sm leading-relaxed text-[#4b5563]">
                              <span className="font-semibold text-[#111111]">Result: </span>
                              {study.outcome}
                            </p>
                          </div>
                        </div>

                        <div className="w-full space-y-3 md:w-auto md:shrink-0">
                          {post && (
                            <Link
                              to={`/blog/${post.id}`}
                              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-[#111111] transition-colors hover:bg-black/6"
                            >
                              Read Story <ArrowRight className="h-4 w-4" />
                            </Link>
                          )}

                          <div className="space-y-2">
                            {study.technologies_used.map((nodeId) => {
                              const node = data.wiki_nodes.entities.find((n) => n.id === nodeId);
                              if (!node) return null;

                              return (
                                <Link key={nodeId} to={`/wiki/${nodeId}`} className="block text-xs text-[#4285F4] hover:underline">
                                  {node.title}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </MagicCard>
                  </BlurFade>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <MagicCard className="p-8 text-center md:p-12">
            <h2 className="text-uplift mb-3 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-[#4b5563]">
              Let&rsquo;s talk about your business and how I can help you get found and get booked.
            </p>
            <div className="flex justify-center">
              <Link to="/contact?context=Let%27s%20work%20together" className="inline-flex">
                <ShimmerButton className="mx-auto font-medium" shimmerColor="#EA4335">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
              </Link>
            </div>
          </MagicCard>
        </section>
      </div>
    </div>
  );
}
