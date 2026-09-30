/*
 * Draft — pending legal review.
 *
 * Terms of Use for the BiyeHobe app and biyehobe.com. Descriptions of what
 * blocking, reporting and verification do are taken from the app's code — see
 * reports/data-inventory.md. Do not add features here that are not merged in
 * the app (no Guardian Mode, no calls, no ID verification, no paid tier).
 *
 * The URL /terms is load-bearing: the app's constants/legal.ts links here,
 * and the signup screen says "By signing up you agree to our Terms".
 */
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CONTACT_EMAIL,
  H2,
  InlineLink,
  LI,
  LegalBody,
  LegalHeader,
  P,
  Rule,
  UL,
} from "../components/Legal";

const UPDATED = "29 September 2026";

export const metadata: Metadata = {
  title: "Terms of Use — BiyeHobe",
  description:
    "The rules for using the BiyeHobe app and website: who can join, how to behave, what verification means, blocking and reporting, and ending your account.",
};

export default function Terms() {
  return (
    <>
      <Navbar alwaysWhite />
      <LegalHeader title="Terms of Use" updated={UPDATED} />

      <LegalBody>
        <P>
          These terms cover the <strong>BiyeHobe app</strong>{" "}and the website at <strong>biyehobe.com</strong>. By creating an account or using either, you agree to them. They&apos;re written in plain English on purpose. If anything is unclear, ask us at <strong>{CONTACT_EMAIL}</strong>.
        </P>
        <P>
          How we handle your information is covered separately in our <InlineLink href="/privacy">Privacy Policy</InlineLink>, which is part of these terms.
        </P>

        <Rule />

        <H2>What BiyeHobe is for</H2>
        <P>
          BiyeHobe helps Bangladeshis, wherever they live, find a spouse. <strong>It is for marriage.</strong>{" "}It isn&apos;t for casual dating, friendship, business or anything else, and accounts used for other purposes may be removed.
        </P>
        <P>
          BiyeHobe introduces people. It doesn&apos;t arrange marriages, and we don&apos;t promise you a match, an introduction or any particular outcome.
        </P>

        <H2>Who can use it</H2>
        <P>To use BiyeHobe you must:</P>
        <UL>
          <LI>Be <strong>18 or older</strong></LI>
          <LI>Be looking for marriage, and be free to marry under the law that applies to you</LI>
          <LI>Have only <strong>one</strong>{" "}account, and use it yourself</LI>
          <LI>Not have been removed from BiyeHobe before</LI>
        </UL>

        <H2>Your account</H2>
        <UL>
          <LI><strong>Be truthful.</strong>{" "}What you put on your profile — your name, age, marital status, religion, photos and everything else — must be accurate and about you. Your photos must be of you.</LI>
          <LI><strong>Keep your sign-in private.</strong>{" "}You&apos;re responsible for what happens on your account.</LI>
          <LI><strong>Your content stays yours.</strong>{" "}You give us permission to store it and show it to other members so the app can work. That permission ends when you delete the content or your account, except for the safety records described in the Privacy Policy.</LI>
        </UL>

        <H2>How to behave</H2>
        <P>
          Treat people the way you&apos;d want your own family treated. In particular, <strong>don&apos;t</strong>:
        </P>
        <UL>
          <LI>Pretend to be someone else, or create a profile for another person</LI>
          <LI>Use photos that aren&apos;t of you, or that are sexual, violent or otherwise inappropriate</LI>
          <LI>Harass, threaten, insult or pressure anyone, or keep contacting someone who has made clear they aren&apos;t interested</LI>
          <LI>Send sexual content, or use hateful language about anyone&apos;s religion, sect, ethnicity, background or marital history</LI>
          <LI>Ask anyone for money, or promote a business, scheme or other website</LI>
          <LI>Scam, spam, or collect other members&apos; information</LI>
          <LI>Share someone&apos;s messages, photos or personal details outside the app without their permission</LI>
          <LI>Use bots or scripts, or try to access parts of the app, site or database that aren&apos;t yours</LI>
          <LI>Do anything illegal</LI>
        </UL>
        <P>
          If you find a genuine security weakness, please tell us at <strong>{CONTACT_EMAIL}</strong>. We&apos;ll thank you properly, and we won&apos;t come after you for reporting it in good faith.
        </P>

        <H2>Blocking and reporting</H2>
        <P>You can block or report anyone from their profile or from your chat with them.</P>
        <UL>
          <LI><strong>Blocking</strong>{" "}hides the two of you from each other, ends any match between you, and deletes your conversation — for both of you. You can unblock someone later, but the conversation doesn&apos;t come back.</LI>
          <LI><strong>Reporting</strong>{" "}sends us the reason you choose, any note you add, and a copy of up to the last 50 messages between you, so we can see what happened even if the conversation is later deleted. If you want to block as well, report first.</LI>
        </UL>
        <P>
          We review reports and decide what to do. That can include no action, a warning, removing content, or suspending or closing an account. We can&apos;t promise to tell you the outcome of every report.
        </P>

        <H2>What &ldquo;verified&rdquo; means</H2>
        <P>
          The verified tick means two things, and only two:
        </P>
        <UL>
          <LI>The person <strong>passed a liveness check</strong>{" "}— a live person was holding the phone during the check, run by our partner Didit; and</LI>
          <LI>Their <strong>main photo matched</strong>{" "}the selfie from that check.</LI>
        </UL>
        <P>
          <strong>There is no ID check.</strong>{" "}The tick doesn&apos;t confirm anyone&apos;s name, age, marital status, religion, education, job, family or intentions. Everything else on a profile is what the person told us. Verification is optional, and an unverified profile isn&apos;t necessarily a fake one.
        </P>

        <H2>Meeting people</H2>
        <P>
          We can&apos;t check who people really are or what they intend, and we don&apos;t run background checks. Take your time. Involve your family. Meet in public the first time, tell someone where you&apos;re going, and never send money to someone you&apos;ve met on BiyeHobe. You&apos;re responsible for your own decisions about the people you meet.
        </P>

        <H2>Suspending or closing accounts</H2>
        <P>
          We may remove content, or suspend or close an account, if we reasonably believe it breaks these terms, puts someone at risk, or exposes BiyeHobe or its members to legal harm. Where it&apos;s safe and practical, we&apos;ll tell you why. If you think we&apos;ve got it wrong, write to us and a person will look at it again.
        </P>

        <H2>Leaving BiyeHobe</H2>
        <P>
          You can delete your account at any time in the app under <strong>Profile → Delete Account</strong>. If you no longer have the app, see <InlineLink href="/delete-account">Delete your account</InlineLink>. Deletion is permanent. It&apos;s explained in full, including the few safety records we keep, on that page.
        </P>

        <H2>Cost</H2>
        <P>
          BiyeHobe doesn&apos;t charge anything today. If that ever changes, we&apos;ll tell you clearly before you&apos;re asked to pay for anything, and nothing will be charged without your agreement.
        </P>

        <H2>The website and waitlist</H2>
        <P>
          You must be 18 or older to join the waitlist, and please only sign up with your own email address. Joining doesn&apos;t guarantee a place, priority or any particular feature.
        </P>

        <H2>What belongs to us</H2>
        <P>
          The BiyeHobe name, the knot mark, and the design and words of the app and website are ours. You&apos;re welcome to link to us and to quote us with attribution. Please don&apos;t copy them for your own product or suggest you&apos;re connected to BiyeHobe when you aren&apos;t.
        </P>

        <H2>Where you stand legally</H2>
        <P>
          BiyeHobe is provided <strong>as is</strong>. We build it carefully, but we can&apos;t promise it will always be available or free of errors, and we aren&apos;t responsible for how other members behave on it or off it.
        </P>
        <P>
          To the fullest extent the law allows, we aren&apos;t liable for indirect or consequential loss arising from your use of BiyeHobe. Nothing in these terms limits any liability that can&apos;t be limited under the law that applies to you — including for fraud, or for anything relating to a person&apos;s fundamental rights.
        </P>

        <H2>Changes</H2>
        <P>
          We may update these terms as BiyeHobe develops. If we make a meaningful change, we&apos;ll update the date at the top and tell you in the app or by email before it takes effect. If you keep using BiyeHobe after that, you&apos;re accepting the new terms.
        </P>

        <H2>Governing law</H2>
        <P>
          These terms are governed by the laws of the <strong>Province of Ontario</strong>{" "}and the federal laws of Canada applicable there. Any dispute goes to the courts of Ontario, unless the law where you live gives you the right to bring it there.
        </P>

        <H2>Contact</H2>
        <P>
          BiyeHobe is operated by <strong>Shah Alam</strong>, Toronto, Ontario, Canada. <strong>{CONTACT_EMAIL}</strong>{" "}— a real person reads it.
        </P>
      </LegalBody>

      <Footer />
    </>
  );
}
