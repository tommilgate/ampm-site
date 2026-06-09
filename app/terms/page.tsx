import LegalLayout from "@/components/LegalLayout";

export const metadata = { title: "Terms & Conditions | AM//PM Emo Night" };

export default function TermsPage() {
  return (
    <LegalLayout>
      <h1>Terms &amp; Conditions</h1>
      <p className="eff">Effective 19/11/2025</p>

      <p>
        These Terms of Service govern use of www.ampmemonight.com and purchases of tickets and merchandise. By accessing
        the site or completing a purchase, you agree to these Terms and the Privacy Policy.
      </p>

      <h2>1. Who You Are Buying From</h2>
      <p>
        www.ampmemonight.com is owned and operated by <strong>The Neighbourhood Collective (ABN 57 425 323 500)</strong>,
        trading as <strong>AM//PM</strong>.
      </p>
      <p>
        Ticketing services are processed through <strong>Oztix</strong> for most events, though some venues may use
        alternative providers with their own terms. Merchandise transactions may be processed through{" "}
        <strong>Shopify</strong>.
      </p>

      <h2>2. Your Agreement</h2>
      <p>
        By visiting or purchasing from the website, you agree to these Terms, the Privacy Policy, and Oztix Terms &amp;
        Conditions for ticket purchases.
      </p>
      <p>
        We may add, withdraw, reschedule, or replace artists; change prices, venues, rooms, or capacity at any time. Use
        is restricted to personal, non-commercial purposes.
      </p>

      <h2>3. Changes to These Terms</h2>
      <p>The Terms displayed at transaction completion apply to your purchase. Updates may occur at any time.</p>

      <h2>4. Conditions of Sale</h2>
      <ul>
        <li>Event tickets are issued via Oztix with their terms applying in addition to website terms</li>
        <li>Merchandise prices are in Australian Dollars (AUD) and include GST</li>
        <li>Online sales close when allocations sell out or per Oztix determination</li>
        <li>The organisation reserves the right to refuse or cancel transactions per Oztix policies</li>
      </ul>

      <h2>5. Venue Entry</h2>
      <ul>
        <li>Valid photo ID required (Australian Driver Licence, Photo Card, or Passport)</li>
        <li>Damaged or expired IDs may be rejected</li>
        <li>Entry is restricted to patrons 18 years and over</li>
        <li>Venues may refuse entry at their discretion</li>
      </ul>

      <h2>6. Refunds and Exchanges</h2>
      <p>
        Changed event details do not automatically entitle ticket holders to refunds. Entitlement to a refund is
        determined by us. Contact the organisation directly to confirm eligibility.
      </p>

      <h2>7. Ticket Delivery</h2>
      <p>
        All event tickets are delivered electronically by Oztix. Contact Oztix Support or{" "}
        <a href="mailto:info@theneighbourhood.me">info@theneighbourhood.me</a> if tickets aren&apos;t received.
      </p>

      <h2>8. Complaints</h2>
      <p>
        Direct complaints to: <a href="mailto:info@theneighbourhood.me">info@theneighbourhood.me</a>
      </p>

      <h2>9. Seeka Tracking, Data Sharing &amp; Measurement</h2>
      <p>
        The organisation uses <strong>Seeka</strong> as an identity and analytics partner across the website and
        ticketing pages.
      </p>
      <p>
        By using the website or purchasing tickets, users acknowledge that Seeka may collect data such as page views,
        click behaviour, device information, email identifiers, and purchase activity.
      </p>
      <p>
        The data may be used for attribution, analytics, personalised marketing, fraud prevention, and audience
        building. Seeka does not collect payment details, with information handled per Australian Privacy Principles.
        Opt-out requests for personalised marketing can be sent to{" "}
        <a href="mailto:info@theneighbourhood.me">info@theneighbourhood.me</a>.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by New South Wales law, with legal proceedings possible in any Australian state or
        territory.
      </p>

      <h2>11. Australian Consumer Law</h2>
      <p>
        Goods and services include consumer guarantees under Australian Consumer Law that cannot be excluded. Customers
        may be entitled to replacements, refunds, or compensation for reasonably foreseeable loss or damage.
      </p>

      <p>
        For questions: <a href="mailto:info@theneighbourhood.me">info@theneighbourhood.me</a>
      </p>
    </LegalLayout>
  );
}
