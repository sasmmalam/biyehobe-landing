import type { Metadata } from "next";
import { ShieldCheck, UserCircle, MessageCircle, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "How It Works — BiyeHobe",
  description:
    "A step-by-step guide to finding your match on BiyeHobe.",
};

const STEPS = [
  {
    n: "01",
    Icon: UserCircle,
    title: "Create Your Profile",
    description:
      "Your BiyeHobe profile goes far beyond a photo and a bio. You will answer thoughtful questions about your values, your family background, your career, your daily life, and the kind of person you are hoping to meet. We believe that depth of profile leads to depth of connection.",
    details: [
      "Share your education, profession, and lifestyle",
      "Describe your family background and expectations",
      "Specify your preferences openly and honestly",
      "Add photos that represent you authentically",
    ],
  },
  {
    n: "02",
    Icon: ShieldCheck,
    title: "Get Verified",
    description:
      "Before your profile goes live, our team personally reviews your identity and your photos. We cross-check your information against supporting documents to ensure that every person you meet on BiyeHobe is exactly who they say they are. This step is non-negotiable.",
    details: [
      "Submit a government-issued ID for identity verification",
      "Our team manually reviews your photos and profile",
      "Approval typically happens within 24–48 hours",
      "Verified badge visible to all users you connect with",
    ],
  },
  {
    n: "03",
    Icon: MessageCircle,
    title: "Discover & Connect",
    description:
      "Once verified, you can browse and receive match suggestions based on your preferences. Profiles show you everything that matters — values, family expectations, lifestyle compatibility — so you can make informed, intentional decisions about who you reach out to.",
    details: [
      "Browse profiles with blurred photos by default for privacy",
      "Reveal photos only when both parties are comfortable",
      "Send a connection request to start a conversation",
      "Guardian Mode lets family observe or participate",
    ],
  },
  {
    n: "04",
    Icon: Heart,
    title: "Move Forward Together",
    description:
      "BiyeHobe is designed to help you move forward with clarity and confidence. Audio calls let you hear each other before you meet. Family involvement is built in. And when the time is right, the next steps are yours to take — with the dignity and intentionality you both deserve.",
    details: [
      "Audio calls for meaningful early conversations",
      "Involve family at any stage with Guardian Mode",
      "Unmatch or block at any time with full control",
      "Our team is available for support throughout",
    ],
  },
];

export default function HowItWorks() {
  return (
    <>
      <Navbar alwaysWhite />

      {/* Header */}
      <section className="pt-28 pb-16 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
        >
          Simple & Intentional
        </p>
        <h1
          className="text-6xl sm:text-7xl leading-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--dark)",
          }}
        >
          How It Works
        </h1>
        <p
          className="mt-6 text-base max-w-xl mx-auto"
          style={{
            color: "rgba(13,31,26,0.62)",
            fontFamily: "var(--font-sans)",
          }}
        >
          BiyeHobe is designed to make the search for a life partner as
          meaningful as the relationship itself.
        </p>
      </section>

      {/* Steps */}
      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20">
          <div className="flex flex-col gap-20">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-start ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                  <div
                    className="text-6xl font-light mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--gold)",
                      opacity: 0.6,
                    }}
                  >
                    {step.n}
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl mb-4"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--dark)",
                    }}
                  >
                    {step.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(13,31,26,0.65)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-8 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}
                  style={{ backgroundColor: "var(--cream)" }}
                >
                  <step.Icon
                    size={28}
                    style={{ color: "var(--gold)", marginBottom: "20px" }}
                  />
                  <ul className="flex flex-col gap-3">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm"
                        style={{
                          color: "rgba(13,31,26,0.72)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--gold)" }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "var(--green)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
          <h2
            className="text-4xl sm:text-5xl text-white mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Ready to begin?
          </h2>
          <p
            className="text-sm mb-8"
            style={{
              color: "rgba(255,255,255,0.70)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Join thousands of Bangladeshi Muslim professionals already on the
            waitlist.
          </p>
          <a
            href="/#waitlist"
            className="inline-block px-9 py-4 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "var(--gold)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
