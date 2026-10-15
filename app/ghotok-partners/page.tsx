import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GhotokInterestForm from "../components/GhotokInterestForm";
import { pageMetadata } from "@/lib/site";

// /ghotok-partners (also /matchmakers, redirected in next.config.ts) — interest
// form for the upcoming Matchmaker (Ghotok) Partners program. The program
// itself isn't built: copy stays at "register your interest".

export const metadata = pageMetadata({
  title: "Become a Matchmaker (Ghotok) Partner — BiyeHobe",
  description:
    "Ghotoks, community organisers and mosque or association volunteers: register your interest in BiyeHobe's upcoming Matchmaker (Ghotok) Partners program. No commitment, no fees.",
  path: "/ghotok-partners",
});

export default function GhotokPartners() {
  return (
    <>
      <Navbar alwaysWhite />

      <section className="pt-28 pb-16 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--gold-ink)", fontFamily: "var(--font-sans)" }}
          >
            Matchmaker (Ghotok) Partners
          </p>
          <h1
            className="text-5xl sm:text-6xl leading-none mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--dark)" }}
          >
            Become a Matchmaker (Ghotok) Partner
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(13,31,26,0.72)", fontFamily: "var(--font-sans)" }}
          >
            Know families looking for a match? Ghotoks, community organisers and mosque/association
            volunteers can join our upcoming Matchmaker (Ghotok) Partners program. Register your interest — no
            commitment, no fees.
          </p>
          <p
            className="text-sm mt-4"
            style={{ color: "rgba(13,31,26,0.62)", fontFamily: "var(--font-sans)" }}
          >
            Partner rewards will be announced before launch.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "white" }}>
        <div className="max-w-xl mx-auto px-5 sm:px-8 py-16">
          <GhotokInterestForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
