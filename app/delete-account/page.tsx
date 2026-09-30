/*
 * Draft — pending legal review.
 *
 * Public account-deletion page, required by Google Play so that people who
 * have uninstalled the app can still ask for deletion. What "deleted" and
 * "kept" mean here is read from the app repo:
 *   supabase/functions/delete-account/index.ts
 *   supabase/migrations/20260919000001_s47_delete_account_support.sql
 * and must stay in step with the app's own screen, app/delete-account.tsx.
 * The email route is a manual process — see reports/latest.md.
 */
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CONTACT_EMAIL,
  Callout,
  H2,
  H3,
  InlineLink,
  LI,
  LegalBody,
  LegalHeader,
  P,
  Rule,
  UL,
} from "../components/Legal";

const UPDATED = "29 September 2026";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Delete my account")}`;

export const metadata: Metadata = {
  title: "Delete Your Account — BiyeHobe",
  description:
    "How to delete your BiyeHobe account — in the app, or by email if you no longer have it — and exactly what is deleted and what is kept.",
};

export default function DeleteAccount() {
  return (
    <>
      <Navbar alwaysWhite />
      <LegalHeader title="Delete your account" updated={UPDATED} />

      <LegalBody>
        <P>
          You can delete your BiyeHobe account whenever you like. Deletion is <strong>permanent</strong>{" "}— it can&apos;t be undone, and you&apos;d need to start again from scratch to come back.
        </P>

        <Rule />

        <H2 id="in-the-app">In the app</H2>
        <ol className="flex flex-col gap-3 mb-6 list-decimal pl-6" style={{ color: "rgba(13,31,26,0.72)" }}>
          <li className="text-base leading-relaxed pl-1">Open BiyeHobe and go to the <strong>Profile</strong>{" "}tab.</li>
          <li className="text-base leading-relaxed pl-1">Tap <strong>Delete Account</strong>.</li>
          <li className="text-base leading-relaxed pl-1">Read what will be deleted, type the confirmation word shown, and tap <strong>Delete my account permanently</strong>.</li>
        </ol>
        <P>
          Your account is deleted straight away and you&apos;re signed out.
        </P>

        <H2 id="by-email">If you no longer have the app</H2>
        <P>
          Email <InlineLink href={MAILTO}>{CONTACT_EMAIL}</InlineLink>{" "}with the subject <strong>&ldquo;Delete my account&rdquo;</strong>. Send it from the email address you signed up with, so we know the request is really from you. If you signed up with a phone number, include that number and we&apos;ll arrange a way to confirm it&apos;s yours.
        </P>
        <P>
          We&apos;ll delete the account the same way the app does and email you when it&apos;s done — normally within 7 days, and never more than 30.
        </P>
        <P>
          You can use the same address to have your <strong>waitlist</strong>{" "}email removed.
        </P>

        <H2 id="what-is-deleted">What gets deleted</H2>
        <UL>
          <LI>Your account: email, phone number (if any) and password</LI>
          <LI>Your profile and all your answers, including your partner preferences</LI>
          <LI>All your photos</LI>
          <LI>Your verification selfie, and your verification results and history</LI>
          <LI>Your likes, passes, shortlists and notes</LI>
          <LI>Your blocks — both people you blocked and people who blocked you</LI>
          <LI>Every conversation you were in, and every message in them</LI>
        </UL>
        <Callout title="Your conversations disappear for the other person too">
          A conversation belongs to two people. When you delete your account, each of your conversations is removed completely, so the people you were talking to lose it as well.
        </Callout>

        <H2 id="what-is-kept">What we keep</H2>
        <P>
          A few records are kept after deletion, for safety, and we don&apos;t yet have a fixed date when they&apos;re removed. Once your account is gone, none of them contains your name, photos or contact details — only an internal number that no longer points to anyone.
        </P>
        <UL>
          <LI><strong>Safety reports</strong>{" "}you made, or that others made about you: the reason, any note, and the copy of up to the last 50 messages between the two people that was taken when the report was filed.</LI>
          <LI><strong>Photo review decisions</strong>{" "}— our notes from reviewing a profile photo that didn&apos;t match its owner&apos;s selfie.</LI>
          <LI><strong>Selfie access records</strong>{" "}— who looked at a verification selfie, when and why. No image.</LI>
          <LI><strong>Two internal copies</strong>{" "}of profile countries and job titles made during database updates in September 2026, which we&apos;re removing.</LI>
        </UL>

        <H3>Held by our verification partner</H3>
        <P>
          If you verified, <strong>Didit</strong>{" "}keeps its own record of your liveness check under its own retention policy, and deleting your BiyeHobe account doesn&apos;t remove it. Email us and we&apos;ll ask Didit to delete it.
        </P>

        <P>
          More detail is in our <InlineLink href="/privacy">Privacy Policy</InlineLink>. Questions: <strong>{CONTACT_EMAIL}</strong>.
        </P>
      </LegalBody>

      <Footer />
    </>
  );
}
