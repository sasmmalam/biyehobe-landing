/*
 * Child safety standards (S68). Required by Google Play for Dating and Social
 * apps: a published CSAE standards page, a way to report in the app, a named
 * contact, and how we report to the authorities. Declared in Play Console.
 *
 * Every "how we prevent it" line is something the app does today — read from
 * the app repo (C:\dev\biyehobe):
 *   18+ at sign-up        lib/age.ts dobError() in onboarding + Edit Profile;
 *                         server-side trigger in 20261120000002 (S68, once applied)
 *   liveness before match lib/profileGate.ts REQUIRE_VERIFICATION = true (Didit)
 *   adult, opposite-gender discover_profiles(): opposite of the viewer's gender,
 *   discovery             onboarded candidates only
 *   no messages first     conversations need both like rows (S66b)
 *   human review          admin panel moderation queue (S67)
 *   evidence kept         report_user() snapshots the last 50 messages into
 *                         `reports`, which outlives the reported account (S47)
 *   report reasons        lib/safetyService.ts REPORT_REASONS: "Underage user",
 *                         "Something else"
 * Change the app, change this page.
 */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Callout,
  H2,
  InlineLink,
  LI,
  LegalBody,
  LegalHeader,
  P,
  Rule,
  UL,
} from "../components/Legal";
import { CONTACT_EMAIL, LEGAL_NAME, pageMetadata } from "@/lib/site";

const UPDATED = "20 November 2026";
const SAFETY_EMAIL = "safety@biyehobe.com";
const SAFETY_MAILTO = `mailto:${SAFETY_EMAIL}?subject=${encodeURIComponent("Child safety report")}`;
const FALLBACK_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Child safety report")}`;

export const metadata = pageMetadata({
  title: "Child safety standards | BiyeHobe",
  description:
    "BiyeHobe is for adults 18 and over. Our zero-tolerance standards on child sexual abuse and exploitation, how we prevent it, how to report it, and how we work with the authorities.",
  path: "/child-safety",
});

export default function ChildSafety() {
  return (
    <>
      <Navbar alwaysWhite />
      <LegalHeader title="Child safety standards" updated={UPDATED} />

      <LegalBody>
        <Callout title="Adults only. Zero tolerance.">
          BiyeHobe is a marriage app for adults <strong>18 and over</strong>. We do not allow child sexual abuse or exploitation (CSAE) of any kind, and we act on every report of it.
        </Callout>

        <H2 id="standards">Our standards</H2>
        <P>
          Nobody under 18 may use BiyeHobe. On BiyeHobe, and in anything connected to it, the following are never allowed:
        </P>
        <UL>
          <LI>Any sexual content involving a minor, real or not, including images, video, text and links</LI>
          <LI>Grooming: building trust with a minor, or with the adults around them, in order to abuse or exploit them</LI>
          <LI>Sexualising minors in any way, including comments, requests or role-play</LI>
          <LI>Using BiyeHobe to arrange contact with a minor, or to share or ask for content involving one</LI>
        </UL>
        <P>
          An account that breaks these standards is removed. These standards sit alongside our <InlineLink href="/terms">Terms of Use</InlineLink>{" "}and our <InlineLink href="/safety">Safety &amp; trust</InlineLink>{" "}policy, where &ldquo;Anyone under 18&rdquo; is a zero-tolerance reason.
        </P>

        <Rule />

        <H2 id="prevention">How we prevent it</H2>
        <UL>
          <LI><strong>Age check at sign-up.</strong>{" "}You enter your date of birth when you set up your profile, and anyone under 18 cannot continue.</LI>
          <LI><strong>Selfie verification before matching.</strong>{" "}A live selfie check, run by our partner Didit, is required before anyone can use Discover, send likes or send messages.</LI>
          <LI><strong>Adult-only discovery.</strong>{" "}Discover shows only members who have finished signing up, and only of the opposite gender.</LI>
          <LI><strong>No messages from strangers.</strong>{" "}A chat opens only after both people have liked each other.</LI>
          <LI><strong>Human review.</strong>{" "}Every report is looked at by a person, not decided by software.</LI>
          <LI><strong>Removal, with evidence kept.</strong>{" "}Accounts that break these standards are removed. When someone is reported, we keep a copy of the report and of recent messages, even if the account is later deleted, so the evidence is not lost.</LI>
        </UL>

        <Rule />

        <H2 id="report">How to report</H2>
        <P>
          <strong>In the app:</strong>{" "}open the person&apos;s profile or your chat with them, tap the <strong>⋯</strong>{" "}menu, choose <strong>Report</strong>, and pick <strong>&ldquo;Underage user&rdquo;</strong>{" "}or <strong>&ldquo;Something else&rdquo;</strong>. The person is never told who reported them.
        </P>
        <P>
          <strong>By email:</strong>{" "}write to <InlineLink href={SAFETY_MAILTO}>{SAFETY_EMAIL}</InlineLink>. If that address doesn&apos;t reach us for any reason, use <InlineLink href={FALLBACK_MAILTO}>{CONTACT_EMAIL}</InlineLink>. Please include the person&apos;s name as shown in the app and what happened. Don&apos;t send us images of a child — describe them instead.
        </P>
        <P>
          <strong>Our contact for child safety:</strong>{" "}BiyeHobe Safety, {LEGAL_NAME}, Toronto, Canada.
        </P>
        <P>
          If a child is in immediate danger, call your local emergency number first (911 in Canada and the United States).
        </P>

        <Rule />

        <H2 id="authorities">Working with the authorities</H2>
        <P>
          We report confirmed child sexual abuse material and exploitation to the <InlineLink href="https://www.cybertip.ca">Canadian Centre for Child Protection (Cybertip.ca)</InlineLink>{" "}and, where relevant, to the <InlineLink href="https://report.cybertip.org">National Center for Missing &amp; Exploited Children (NCMEC)</InlineLink>{" "}in the United States. We cooperate with law enforcement, and we keep the related records so they can be provided when lawfully requested.
        </P>
        <P>
          You can also report directly to Cybertip.ca or NCMEC yourself. You don&apos;t need to go through us.
        </P>
      </LegalBody>

      <Footer />
    </>
  );
}
