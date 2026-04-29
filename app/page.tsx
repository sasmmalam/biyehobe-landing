"use client";

import { useState } from "react";
import { Shield, EyeOff, Smartphone } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email, created_at: new Date().toISOString() });

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  function scrollToWaitlist() {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF8F5" }}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: "#1B4D3E" }}>
            বিয়ে হবে · BiyeHobe
          </span>
          <button
            onClick={scrollToWaitlist}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C9952A" }}
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: "#1B4D3E" }}>
              বিয়ে হবে · BiyeHobe
            </h1>
            <p className="mt-4 text-xl sm:text-2xl italic font-medium" style={{ color: "#C9952A" }}>
              Where tradition meets intention.
            </p>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              A private, verified space for Bangladeshi Muslim professionals worldwide.
            </p>
            <button
              onClick={scrollToWaitlist}
              className="mt-8 inline-block px-8 py-4 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#C9952A" }}
            >
              Join the Waitlist
            </button>
          </div>

          {/* Mockup placeholder */}
          <div className="flex-shrink-0">
            <div
              className="w-64 h-96 sm:w-72 sm:h-[28rem] rounded-3xl flex items-center justify-center text-center p-6"
              style={{ border: "2px solid #1B4D3E", backgroundColor: "#FAF8F5" }}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "#1B4D3E" }}
                >
                  <Smartphone size={24} color="white" />
                </div>
                <p className="font-medium text-sm" style={{ color: "#1B4D3E" }}>
                  App Preview Coming Soon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-200" style={{ backgroundColor: "white" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#1B4D3E" }}>
              Built differently.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield size={32} />,
                  title: "Verified Profiles",
                  desc: "Every profile manually reviewed. NID verification ensures you meet real, serious people only.",
                },
                {
                  icon: <EyeOff size={32} />,
                  title: "Privacy First",
                  desc: "Your photos stay blurred until you choose to reveal them. You stay in control.",
                },
                {
                  icon: <Smartphone size={32} />,
                  title: "Modern Experience",
                  desc: "Built for professionals. Clean, fast, and distraction-free — matrimony the way it should be.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl p-8 flex flex-col items-center text-center gap-4"
                  style={{ backgroundColor: "#FAF8F5" }}
                >
                  <div style={{ color: "#1B4D3E" }}>{f.icon}</div>
                  <h3 className="text-lg font-semibold" style={{ color: "#1B4D3E" }}>
                    {f.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold" style={{ color: "#1B4D3E" }}>
            Be the first to know.
          </h2>
          <p className="mt-3 text-gray-600 max-w-md mx-auto">
            Launching soon for NRB professionals &amp; academics. Reserve your spot.
          </p>

          {status === "success" ? (
            <div
              className="mt-8 inline-block px-6 py-4 rounded-xl font-medium text-white"
              style={{ backgroundColor: "#1B4D3E" }}
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "#C9952A" }}
              >
                {status === "loading" ? "Joining…" : "Join Waitlist"}
              </button>
            </form>
          )}

          {status === "duplicate" && (
            <p className="mt-3 text-sm" style={{ color: "#C9952A" }}>
              This email is already on the waitlist.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-500">
              Something went wrong. Please try again.
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-gray-500">
          <p>© 2025 BiyeHobe. All rights reserved.</p>
          <p className="mt-1">The modern matrimonial for NRB professionals &amp; academics.</p>
        </div>
      </footer>
    </div>
  );
}
