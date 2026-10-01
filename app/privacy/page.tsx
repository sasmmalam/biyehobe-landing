/*
 * Draft — pending legal review.
 *
 * Privacy Policy for the BiyeHobe app and biyehobe.com. Every factual claim
 * here is traced to code in reports/data-inventory.md (file:line per row).
 * Claims that are commitments rather than code — manual deletion by email,
 * asking Didit to delete, response times — are listed in reports/latest.md
 * so they are not mistaken for built features.
 *
 * The URL /privacy is load-bearing: the app's constants/legal.ts links here.
 */
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CONTACT_EMAIL,
  Callout,
  DataTable,
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

const UPDATED = "30 September 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — BiyeHobe",
  description:
    "What the BiyeHobe app and website collect, why, who can see it, how long we keep it, and how to delete it — including the verification selfie.",
};

export default function Privacy() {
  return (
    <>
      <Navbar alwaysWhite />
      <LegalHeader title="Privacy Policy" updated={UPDATED} />

      <LegalBody>
        <P>
          This policy covers the <strong>BiyeHobe app</strong>{" "}and the website at <strong>biyehobe.com</strong>. It says what we collect, why, who can see it, how long we keep it, and how to have it deleted. We&apos;ve tried to write it the way we&apos;d want it explained to our own family.
        </P>

        <Callout title="The short version">
          <UL>
            <LI>We collect what you put in your profile, your photos, your messages, and — only if you choose to verify — one selfie.</LI>
            <LI>Other members see your profile, but never your email, phone number, exact location or selfie.</LI>
            <LI>Your photos are stored privately and shown only to signed-in members. With photo privacy on — the default for women, and a setting for everyone — they appear blurred in the app until you and the other person have both liked each other.</LI>
            <LI>We don&apos;t sell your data, show you ads, or use analytics or tracking tools.</LI>
            <LI>You can delete your account in the app at any time. A few safety records are kept, and we list them below.</LI>
          </UL>
        </Callout>

        <Rule />

        <H2 id="who-we-are">Who we are</H2>
        <P>
          BiyeHobe is a matrimonial app for Bangladeshis, wherever they live. It is operated by <strong>Shah Alam</strong>{" "}in Toronto, Ontario, Canada, who is responsible for your information. Questions go to <strong>{CONTACT_EMAIL}</strong>, and a real person reads them.
        </P>

        <H2 id="what-we-collect">What we collect</H2>

        <H3>When you sign up</H3>
        <UL>
          <LI><strong>Email address and password.</strong>{" "}Your password is stored in scrambled (hashed) form by our database provider. We can&apos;t read it.</LI>
          <LI><strong>First name, and your gender.</strong>{" "}We also give you a username automatically.</LI>
          <LI><strong>Phone number</strong>{" "}— only if you choose to sign in with a text-message code.</LI>
        </UL>

        <H3>Your profile</H3>
        <P>
          Onboarding and Edit Profile ask about you so we can suggest suitable matches. This includes your date of birth, height, education, profession and (optionally) job title, a short bio, nationality, ethnicity, mother tongue, religion and practising level, marital status, whether you have or want children, when you hope to marry, lifestyle answers (such as smoking, drinking and diet), hobbies, interests and personality traits, and whether you&apos;d relocate.
        </P>
        <P>
          Some of these questions are required to finish onboarding — religion, practising level, marital status and education among them — but each offers a <strong>&ldquo;Prefer not to say&rdquo;</strong>{" "}answer.
        </P>

        <H3>Who you&apos;re looking for</H3>
        <P>
          Your partner preferences — age range, height, religion, practising level, marital status, education, countries and distance. Only you can see these. We use them to filter who appears in your matches.
        </P>

        <H3>Your location</H3>
        <P>
          We store your <strong>city and country</strong>, which you pick from a list. If you tap <strong>&ldquo;Use GPS&rdquo;</strong>, your phone reads your position once so we can look up your city for you. Your phone&apos;s own location service does that lookup (Google on Android, Apple on iOS). <strong>We don&apos;t save your GPS coordinates</strong>{" "}— only the city and country you confirm.
        </P>

        <H3>Your photos</H3>
        <P>
          Up to six profile photos. The first one is your main photo and can be checked against your verification selfie (see the next section). Your photos are stored privately, not at public web addresses — see <a href="#how-others-see-you">How other members see you</a>.
        </P>

        <H3>What you do in the app</H3>
        <UL>
          <LI>Who you like, pass on or shortlist, and any note you send with a like.</LI>
          <LI>Your conversations with people you&apos;ve matched with: the text of each message, who sent it, when, and when it was read.</LI>
          <LI>People you&apos;ve blocked, and any reports you make (see <InlineLink href="#safety">Safety records</InlineLink>).</LI>
        </UL>

        <H3>On the website</H3>
        <P>
          If you join the waitlist, we store your email address and the time you signed up. That&apos;s all. The website sets no advertising or tracking cookies and runs no analytics.
        </P>

        <H2 id="biometric">Your verification selfie (biometric data)</H2>
        <P>
          A face is biometric data, and we treat it more carefully than anything else we hold. Here is the whole picture.
        </P>

        <H3>What verification is</H3>
        <P>
          Verification has two parts, and the verified tick on a profile means both have passed:
        </P>
        <UL>
          <LI><strong>A liveness check.</strong>{" "}You follow on-screen prompts for a few seconds so our verification partner, <strong>Didit</strong>, can confirm a real, live person is holding the phone.</LI>
          <LI><strong>A photo match.</strong>{" "}We compare your main profile photo with a selfie from that check, to confirm the photo on your profile is of you.</LI>
        </UL>
        <P>
          <strong>There is no ID check.</strong>{" "}We never ask for a passport, driving licence or any government document.
        </P>

        <H3>It&apos;s your choice</H3>
        <P>
          Verification is optional. It only happens if you start it from the Verify screen, and starting it is your consent to what this section describes. You can use BiyeHobe without ever verifying — you just won&apos;t have the tick.
        </P>

        <H3>What we keep</H3>
        <UL>
          <LI><strong>One selfie image</strong>{" "}taken from your liveness check. We keep it in private storage that other members can&apos;t reach, so we can compare it with your main photo again whenever you change that photo. If you verify again, the new selfie replaces the old one.</LI>
          <LI><strong>The results</strong>: whether the liveness check passed, a similarity score for each photo comparison, and the country your connection came from plus whether it looked like a VPN or proxy. We don&apos;t keep your IP address itself.</LI>
          <LI><strong>An access record.</strong>{" "}Whenever our system or a person on our side opens your selfie through our tools, we log who, when and why. The log holds no image.</LI>
        </UL>

        <H3>What Didit keeps</H3>
        <P>
          The liveness check runs on Didit&apos;s service, and Didit keeps its recording of it under <strong>its own retention policy</strong>, which we don&apos;t control. Photo comparisons are sent to Didit with the setting that tells it not to store anything. Deleting your BiyeHobe account does <strong>not</strong>{" "}automatically delete Didit&apos;s copy of your liveness check. If you want it deleted, email us and we&apos;ll ask Didit to delete it.
        </P>

        <H3>What we&apos;ll never do with it</H3>
        <P>
          Your selfie and results are used <strong>only</strong>{" "}to verify you and to check your main photo. We don&apos;t sell them, show them to other members, use them for advertising, or use them to train anything.
        </P>

        <H3>Deleting it</H3>
        <P>
          Your selfie is deleted when you delete your account. If you want it removed but want to keep your account, email us — your verified tick will be removed with it.
        </P>

        <H2 id="sensitive">Sensitive information</H2>
        <P>
          Some of what you tell us is sensitive: your <strong>religion, sect and practising level</strong>, your <strong>marital status</strong>, whether you <strong>have children</strong>, and your <strong>ethnicity</strong>. You give it to us so people looking for a spouse can see it, and it appears on your profile for that reason. Religion, practising level and marital status can also be used by other members to filter who they see. &ldquo;Prefer not to say&rdquo; is always available.
        </P>

        <H2 id="how-others-see-you">How other members see you</H2>
        <P>Any signed-in BiyeHobe member can see:</P>
        <UL>
          <LI>Your first name, username and photos (blurred until you match, if photo privacy is on — see below)</LI>
          <LI>Your date of birth, height and gender</LI>
          <LI>Your city and country — never your exact location</LI>
          <LI>Your education, profession, job title and bio</LI>
          <LI>Your nationality, ethnicity and mother tongue</LI>
          <LI>Your religion, sect, practising level and related faith answers</LI>
          <LI>Your marital status, children, marriage timeline, lifestyle answers, hobbies, interests and personality traits</LI>
          <LI>Whether you have the verified tick, and when you joined</LI>
        </UL>
        <P>
          <strong>Other members never see</strong>{" "}your email, phone number, GPS coordinates, verification selfie or scores, partner preferences, or anything about your account&apos;s standing with us.
        </P>
        <P>
          If you block someone, or they block you, neither of you can see the other&apos;s profile any more.
        </P>
        <P>
          <strong>How your photos are shared:</strong>{" "}your photos are stored privately. They are shown only to signed-in members who are allowed to see your profile, through temporary links that stop working after about an hour. Nobody can open them without signing in, and someone you&apos;ve blocked, or who has blocked you, can&apos;t load them at all.
        </P>
        <P>
          <strong>Photo privacy:</strong>{" "}with photo privacy on, your photos appear blurred in the app to other members until you have both liked each other. It is on by default for women, and anyone can turn it on or off under Profile → &ldquo;Blur my photos until we match&rdquo;. The blur is applied by the app on the other member&apos;s phone, so it controls what they see in BiyeHobe. It doesn&apos;t stop someone you&apos;ve matched with from taking a screenshot of your photos.
        </P>
        <P>
          <strong>About messages:</strong>{" "}messages are protected in transit and stored in our database, but they are not end-to-end encrypted. Only you and the person you&apos;re talking to can read them in the app. We can access them if we need to — for example, to review a report.
        </P>

        <H2 id="how-we-use">How we use your information</H2>
        <UL>
          <LI>To run your account and show your profile to other members</LI>
          <LI>To suggest matches, using your profile and preferences</LI>
          <LI>To deliver your messages</LI>
          <LI>To verify you, if you choose to</LI>
          <LI>To keep people safe: handling blocks and reports, and dealing with fake or abusive accounts</LI>
          <LI>To tell you when BiyeHobe opens, if you joined the waitlist</LI>
        </UL>
        <P>
          <strong>We do not sell your data, and we never will.</strong>{" "}We show no ads and use no analytics, advertising or tracking tools in the app or on the website. If ownership of BiyeHobe ever changes, we&apos;ll tell you before it happens, not after.
        </P>

        <H2 id="processors">Who processes it for us</H2>
        <P>
          A small number of service providers handle data on our behalf. They act on our instructions and may not use your data for their own purposes.
        </P>
        <DataTable
          head={["Provider", "What they do", "What they receive"]}
          rows={[
            ["Supabase", "Our database, sign-in, file storage and server functions. Hosted in the United States (us-east-1).", "Everything described in this policy"],
            ["Didit", "Liveness check and photo matching", "Your liveness check; your main photo and selfie when comparing them; an internal account number (not your name or email)"],
            ["Vercel", "Hosts biyehobe.com", "Standard web request information, such as IP address"],
            ["Expo (EAS)", "Builds the app", "Nothing from the app while you use it"],
            ["Google Play", "Distributes the Android app", "What Google collects under its own policy when you install"],
          ]}
        />
        <P>
          If you sign in with a text-message code, the code is sent through our database provider&apos;s SMS service. Our hosting providers also keep short-lived technical logs, which can include IP addresses, for security and troubleshooting.
        </P>

        <H2 id="outside-canada">Your data is stored outside Canada</H2>
        <P>
          Our database is in the United States, and Didit may process your verification outside Canada. While your information is there, it may be accessible to authorities under the laws of that country, including through legal processes that don&apos;t require your knowledge or consent. You&apos;re entitled to know that up front.
        </P>

        <H2 id="retention">How long we keep it</H2>
        <P>
          Most of what we hold lasts as long as your account does, and goes when you delete it.
        </P>
        <DataTable
          head={["Information", "Kept until"]}
          rows={[
            ["Account, profile, preferences, photos", "You delete them, or delete your account"],
            ["Verification selfie and results", "You delete your account (or ask us to remove them)"],
            ["Conversations and messages", "Either person blocks the other, or either person deletes their account. Both remove the conversation for both people."],
            ["Likes, passes, notes", "You delete your account. A block also removes the match between the two of you."],
            ["Didit's liveness recording", "Didit's own retention policy (see above)"],
            ["Waitlist email", "You ask us to delete it"],
          ]}
        />

        <H3 id="safety">Safety records we keep after you leave</H3>
        <P>
          To keep people safe, a few records are <strong>kept after an account is deleted</strong>, and we don&apos;t yet have a fixed date when they&apos;re removed:
        </P>
        <UL>
          <LI><strong>Reports</strong>{" "}you made, or that were made about you: the reason, the reporter&apos;s note, and a copy of up to the last 50 messages between the two people, taken automatically when the report was filed. Once the account is gone, they hold only an internal number, not a name, photo or contact details.</LI>
          <LI><strong>Photo review decisions</strong>{" "}— our notes when we&apos;ve reviewed a photo that didn&apos;t match its owner&apos;s selfie.</LI>
          <LI><strong>Selfie access records</strong>{" "}— who looked at a selfie, when and why (no image).</LI>
          <LI><strong>Two internal copies</strong>{" "}of profile countries and job titles, made during database updates in September 2026. We&apos;re removing these.</LI>
        </UL>
        <P>
          See <InlineLink href="/delete-account">Delete your account</InlineLink>{" "}for exactly what deletion removes.
        </P>

        <H2 id="security">How we protect it</H2>
        <P>
          Access rules in our database stop members reading anything beyond what&apos;s listed above. Your photos and your verification selfie are in private storage; photos are only ever handed out as temporary links to signed-in members allowed to see your profile, and our own tools log every time they open your selfie. Only the founder has administrative access. Data is encrypted in transit.
        </P>
        <P>
          We&apos;re a small operation and won&apos;t pretend to have a security team. If something ever goes wrong, we&apos;ll tell you promptly and honestly, and report it to the Office of the Privacy Commissioner of Canada as the law requires.
        </P>

        <H2 id="rights">Your rights</H2>
        <P>You can, at any time:</P>
        <UL>
          <LI><strong>See</strong>{" "}what we hold about you — ask, and we&apos;ll send you a copy</LI>
          <LI><strong>Correct</strong>{" "}it — most of it you can edit in the app yourself</LI>
          <LI><strong>Delete</strong>{" "}it — in the app under <strong>Profile → Delete Account</strong>, or <InlineLink href="/delete-account">by email</InlineLink>{" "}if you no longer have the app</LI>
          <LI><strong>Withdraw consent</strong>{" "}to verification, by asking us to remove your selfie</LI>
          <LI><strong>Ask a question</strong>{" "}about any of this and get a real answer</LI>
        </UL>
        <P>
          Email <strong>{CONTACT_EMAIL}</strong>. We&apos;ll reply within 30 days, and usually much sooner. We may need to confirm the request comes from the account&apos;s owner — normally by replying from the email address on the account.
        </P>
        <P>
          If you&apos;re unhappy with how we&apos;ve handled your information, you can complain to the <strong>Office of the Privacy Commissioner of Canada</strong>{" "}at <InlineLink href="https://www.priv.gc.ca">priv.gc.ca</InlineLink>, or to the privacy regulator where you live.
        </P>

        <H2 id="adults">For adults only</H2>
        <P>
          BiyeHobe is for people aged <strong>18 or over</strong>. The app asks for your date of birth when you sign up, and you must not use BiyeHobe if you&apos;re younger. If you believe someone under 18 is using BiyeHobe, report them in the app (&ldquo;Underage user&rdquo;) or email us, and we&apos;ll act on it.
        </P>

        <H2 id="changes">Changes to this policy</H2>
        <P>
          If we change anything meaningful, we&apos;ll update the date at the top and tell you in the app or by email before the change takes effect. We won&apos;t quietly rewrite it.
        </P>

        <H2 id="contact">Contact</H2>
        <P>
          BiyeHobe is operated by <strong>Shah Alam</strong>, Toronto, Ontario, Canada. Privacy questions, requests and complaints: <strong>{CONTACT_EMAIL}</strong>.
        </P>
        <p className="text-sm italic mt-10" style={{ color: "rgba(13,31,26,0.65)" }}>
          This policy is governed by the laws of the Province of Ontario and the federal laws of Canada applicable there.
        </p>
      </LegalBody>

      <Footer />
    </>
  );
}
