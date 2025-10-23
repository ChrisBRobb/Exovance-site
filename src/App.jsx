import React, { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Network,
  Gauge,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// Exovance brand tokens
const brand = {
  indigo: "#2B2F77",
  teal: "#00C6AE",
  sky: "#57A0FF",
  graphite: "#4A4A4A",
  sand: "#E8E5DB",
};

// Simple container
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full ${className}`}>
    {children}
  </section>
);

// Pill tag
const Pill = ({ children }) => (
  <span
    className="inline-block rounded-full px-3 py-1 text-xs font-medium"
    style={{ background: brand.sand, color: brand.graphite }}
  >
    {children}
  </span>
);

// CTA Button
const CTA = ({ href = "#contact", children }) => (
  <a
    href={href}
    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md"
    style={{ background: brand.teal, color: "white" }}
  >
    {children} <ArrowRight size={18} />
  </a>
);

export default function App() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [sending, setSending] = useState(false);

  // ✅ CRITICAL FIX: Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init("vs3Im3hkjONae4fty");
  }, []);

  const handleEmailJsSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Simple honeypot: if filled, treat as bot and do nothing.
    const hp = formRef.current?.querySelector('input[name="website"]');
    if (hp && hp.value) return;

    try {
      setSending(true);
      
      // Send form data to Exovance (with built-in auto-reply enabled in template)
      const res = await emailjs.sendForm(
        "service_iykffzy",       
        "template_s4a42ma",      // Contact Form template (has auto-reply enabled)
        formRef.current
      );

      if (res.status === 200) {
        setStatus("ok");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-gray-900" style={{ background: "white" }}>
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo wordmark */}
          <a href="#top" className="flex items-center gap-2">
            <div
              className="text-xl font-extrabold tracking-tight"
              style={{ color: brand.indigo }}
            >
              EXO<span style={{ color: brand.teal }}>VANCE</span>
            </div>
            <div className="sr-only">Exovance — Beyond Transformation</div>
          </a>
          <nav className="hidden gap-6 md:flex" aria-label="Primary">
            <a
              href="#services"
              className="text-sm font-medium hover:underline"
              style={{ color: brand.graphite }}
            >
              Services
            </a>
            <a
              href="#approach"
              className="text-sm font-medium hover:underline"
              style={{ color: brand.graphite }}
            >
              Approach
            </a>
            <a
              href="#work"
              className="text-sm font-medium hover:underline"
              style={{ color: brand.graphite }}
            >
              Case studies
            </a>
            <a
              href="#about"
              className="text-sm font-medium hover:underline"
              style={{ color: brand.graphite }}
            >
              About
            </a>
          </nav>
          <div className="hidden md:block">
            <CTA>Start a conversation</CTA>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(1200px 600px at 20% -10%, ${brand.sky}15, transparent), radial-gradient(1200px 600px at 80% 10%, ${brand.teal}15, transparent)`,
            }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <Pill>Technology consulting</Pill>
          <h1
            className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl"
            style={{ color: brand.indigo }}
          >
            Beyond Transformation
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            We design and deliver technology strategies that create lasting value. Not
            just transformation — evolution. Exovance unites strategy, platforms, and
            people so your organisation can keep moving forward.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTA>Book a discovery call</CTA>
            <a
              href="#services"
              className="rounded-2xl px-5 py-3 text-sm font-semibold"
              style={{ color: brand.indigo, background: brand.sand }}
            >
              Explore services
            </a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Lightbulb, title: "Strategy", text: "Target architectures, roadmaps, investment cases." },
              { icon: Network, title: "Platforms", text: "Cloud, integration, data & AI foundations." },
              { icon: Gauge, title: "Delivery", text: "Operating models, governance, value realisation." },
              { icon: Building2, title: "Adoption", text: "Human change, capability, continuous evolution." },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border p-5 shadow-sm">
                <f.icon className="mb-3" style={{ color: brand.teal }} />
                <div className="text-base font-semibold" style={{ color: brand.indigo }}>
                  {f.title}
                </div>
                <p className="mt-1 text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: brand.indigo }}>
            Services
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Advisory that connects vision to value — from boardroom strategy to platform
            execution and human-centred adoption.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Technology Strategy & Architecture",
                bullets: [
                  "Digital strategy & investment cases",
                  "Target state architecture & roadmaps",
                  "Platform selection & RFPs",
                ],
              },
              {
                title: "Cloud & Integration",
                bullets: [
                  "Hybrid & multi-cloud strategy",
                  "API & event-driven architecture",
                  "Data platform & analytics foundations",
                ],
              },
              {
                title: "Transformation Delivery",
                bullets: [
                  "Operating model design & governance",
                  "Agile at scale, DevOps, product enablement",
                  "Value metrics & benefits realisation",
                ],
              },
            ].map((service, i) => (
              <article key={i} className="rounded-2xl border p-6 shadow-sm">
                <div className="text-xl font-semibold" style={{ color: brand.indigo }}>
                  {service.title}
                </div>
                <ul className="mt-3 space-y-2">
                  {service.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={18} style={{ color: brand.teal }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: brand.indigo }}>
            Our approach
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Technology transformation isn't a project — it's a capability. We partner with
            you across discovery, design, and delivery so you can sustain momentum, adapt,
            and evolve.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "1. Discover",
                bullets: [
                  "We listen first and uncover constraints",
                  "Map stakeholder needs and organisational readiness",
                  "Identify pathways that are feasible and valuable",
                ],
              },
              {
                title: "2. Design",
                bullets: [
                  "Target architecture to operating models",
                  "Solutions that fit your context, not theoretical best practice",
                  "Prototype, validate, and refine with your teams",
                ],
              },
              {
                title: "3. Deliver",
                bullets: [
                  "Enable your teams to execute with clarity and confidence",
                  "Guardrails, patterns, and continuous learning",
                  "Build capabilities that endure",
                ],
              },
            ].map((phase, i) => (
              <article key={i} className="rounded-2xl border p-6 shadow-sm">
                <div className="text-xl font-semibold" style={{ color: brand.indigo }}>
                  {phase.title}
                </div>
                <ul className="mt-3 space-y-2">
                  {phase.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={18} style={{ color: brand.teal }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Case Studies */}
      <Section id="work" className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: brand.indigo }}>
            Case studies
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Real engagements, measured outcomes — from strategy to execution.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                client: "Financial services provider",
                challenge: "Fragmented platforms and manual processes",
                outcome: "Target architecture for API-led integration, reducing cycle time by 40%",
                bullets: [
                  "Unified integration strategy & vendor selection",
                  "DevOps patterns & product operating model",
                  "Accelerated delivery and reduced risk",
                ],
              },
              {
                client: "Public Sector",
                challenge: "Unclear governance and delivery model putting projects at risk",
                outcome: "A focused, outcome-driven delivery model for leaner, faster, and better aligned projects",
                bullets: [
                  "Stakeholders aligned on key value drivers",
                  "Established a lean governance and funding model",
                  "Accelerated delivery with reduced overhead",
                ],
              },
            ].map((cs, i) => (
              <article key={i} className="rounded-2xl border p-6 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {cs.client}
                </div>
                <div className="mt-2 text-lg font-semibold" style={{ color: brand.indigo }}>
                  {cs.challenge}
                </div>
                <p className="mt-2 text-sm italic text-gray-600">{cs.outcome}</p>
                <ul className="mt-3 space-y-2">
                  {cs.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={18} style={{ color: brand.teal }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* About */}
      <Section id="about" className="bg-[color:var(--sand)]" style={{ ["--sand"]: brand.sand }}>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: brand.indigo }}>
            About Exovance
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-gray-700">
                Exovance is a boutique technology consulting partner headquartered in
                Aotearoa New Zealand. We help organisations align strategy and platforms
                with the people who use them — so change sticks and value compounds. Our
                model blends executive advisory with hands-on architecture and delivery
                enablement.
              </p>
              <ul className="mt-6 space-y-2 text-gray-700">
                {[
                  "Financial services, healthcare, public sector expertise",
                  "$100m+ portfolio experience; pragmatic governance",
                  "Architects, product leaders, data & change specialists",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={18} style={{ color: brand.teal }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-6 shadow-sm">
              <div className="text-lg font-semibold" style={{ color: brand.indigo }}>
                Highlights
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <dt className="font-medium">Time-to-value</dt>
                  <dd>Accelerators, patterns, and guardrails for faster delivery.</dd>
                </div>
                <div>
                  <dt className="font-medium">Human-centred</dt>
                  <dd>Change and capability embedded in every engagement.</dd>
                </div>
                <div>
                  <dt className="font-medium">Measured outcomes</dt>
                  <dd>Value tracking and benefits realisation baked in.</dd>
                </div>
                <div>
                  <dt className="font-medium">Trusted partners</dt>
                  <dd>We work alongside your teams and vendors — transparently.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${brand.indigo} 0%, ${brand.indigo} 50%, ${brand.sky} 100%)`,
          }}
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Start a conversation</h2>
              <p className="mt-3 max-w-xl text-white/80">
                Tell us about your goals and constraints. We'll respond with a practical
                next step and a lightweight plan to explore value, risks, and options.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-white/90">
                <div className="flex items-center gap-2">
                  <Mail size={18} />{" "}
                  <a className="underline" href="mailto:hello@exovance.co.nz">
                    hello@exovance.co.nz
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} />{" "}
                  <a className="underline" href="tel:+64000000000">
                    +64 00 000 0000
                  </a>
                </div>
              </div>
            </div>

            {/* EMAILJS FORM */}
            <form
              ref={formRef}
              onSubmit={handleEmailJsSubmit}
              className="rounded-2xl bg-white p-6 shadow-xl"
            >
              <label className="block text-sm font-medium text-gray-700">
                Name
                <input
                  name="from_name"
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  name="reply_to"
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-gray-700">
                Message
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
                  placeholder="What challenge are you solving?"
                  required
                />
              </label>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
              />

              <button
                type="submit"
                disabled={sending}
                className="mt-5 w-full rounded-2xl px-5 py-3 font-semibold text-white disabled:opacity-70"
                style={{ background: brand.teal }}
              >
                {sending ? "Sending..." : "Send message"}
              </button>

              {status === "ok" && (
                <p className="mt-3 text-sm text-green-700">
                  Thanks — your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-sm text-red-700">
                  Sorry, something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="text-lg font-extrabold" style={{ color: brand.indigo }}>
              EXO<span style={{ color: brand.teal }}>VANCE</span>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Exovance Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#services" className="hover:underline">
                Services
              </a>
              <a href="#approach" className="hover:underline">
                Approach
              </a>
              <a href="#work" className="hover:underline">
                Work
              </a>
              <a href="#about" className="hover:underline">
                About
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
