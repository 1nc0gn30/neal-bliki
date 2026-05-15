import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [params] = useSearchParams();
  const context = params.get("context") || "";
  const success = params.get("success") === "true";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  const prefills = useMemo(
    () => ({
      subject: context ? `Help request: ${context}` : "Website growth help",
      message: context
        ? `Hi Neal, I want help with this: ${context}\n\nMy website:\nMy top pain point:\nMy timeline:`
        : "Hi Neal,\n\nMy website:\nMy top pain point:\nMy timeline:",
    }),
    [context]
  );

  useMemo(() => {
    setSubject(prefills.subject);
    setMessage(prefills.message);
  }, [prefills]);

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address";
    }
    if (!subject.trim()) next.subject = "Subject is required";
    if (!message.trim()) {
      next.message = "Message is required";
    } else if (message.trim().length < 20) {
      next.message = "Message must be at least 20 characters";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, subject, message]);

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    subject.trim().length > 0 &&
    message.trim().length >= 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!validate()) return;

    setSubmitting(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        window.location.href = "/contact/?success=true";
      })
      .catch(() => {
        window.location.href = "/contact/?success=true";
      });
  };

  return (
    <div className="px-6 pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-uplift mb-3 text-4xl font-bold tracking-tight text-[#111111] md:text-5xl">
            Contact Neal
          </h1>
          <p className="mx-auto max-w-xl text-[#4b5563]">
            Share your website pain point and I will send a practical action plan focused on results.
          </p>
        </header>

        <BlurFade inView>
          <MagicCard className="p-6 md:p-8">
            {success && (
              <div className="mb-6 rounded-2xl border border-[#34A853]/30 bg-[#34A853]/10 px-4 py-3 text-sm text-[#1f5130]">
                Thanks, your message was sent successfully. I&rsquo;ll follow up soon.
              </div>
            )}

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&rsquo;t fill this out if you&rsquo;re human: <input name="bot-field" />
                </label>
              </p>
              <input type="hidden" name="context" value={context} />

              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#111111]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  autoComplete="name"
                  className={cn(
                    "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                    touched.name && errors.name
                      ? "border-[#EA4335] focus:border-[#EA4335]"
                      : "border-black/15 focus:border-[#4285F4]"
                  )}
                  placeholder="Your name"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-xs text-[#EA4335]">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#111111]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  autoComplete="email"
                  className={cn(
                    "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                    touched.email && errors.email
                      ? "border-[#EA4335] focus:border-[#EA4335]"
                      : "border-black/15 focus:border-[#4285F4]"
                  )}
                  placeholder="you@company.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-[#EA4335]">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#111111]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                  className={cn(
                    "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                    touched.subject && errors.subject
                      ? "border-[#EA4335] focus:border-[#EA4335]"
                      : "border-black/15 focus:border-[#FBBC05]"
                  )}
                  placeholder="What do you need help with?"
                />
                {touched.subject && errors.subject && (
                  <p className="mt-1 text-xs text-[#EA4335]">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-[#111111]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  className={cn(
                    "w-full rounded-xl border bg-white px-4 py-2.5 text-[#111111] outline-none transition-colors",
                    touched.message && errors.message
                      ? "border-[#EA4335] focus:border-[#EA4335]"
                      : "border-black/15 focus:border-[#EA4335]"
                  )}
                  placeholder="Tell me about your project..."
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-xs text-[#EA4335]">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-[#9ca3af]">
                  {message.trim().length}/20 characters minimum
                </p>
              </div>

              <button
                type="submit"
                disabled={!isValid || submitting}
                className={cn(
                  "inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
                  isValid && !submitting
                    ? "border border-[#4285F4]/35 bg-[#4285F4]/10 text-[#111111] hover:bg-[#4285F4]/16"
                    : "cursor-not-allowed bg-black/10 text-[#9ca3af]"
                )}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </MagicCard>
        </BlurFade>
      </div>
    </div>
  );
}
