export default function Footer() {
  const socials = [
    { label: "Instagram", href: "https://instagram.com/ampmemonight", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/ig.svg?v=1755349382" },
    { label: "Facebook", href: "https://facebook.com/ampmemonight", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/fb.svg?v=1755349391" },
    { label: "TikTok", href: "https://tiktok.com/@ampmemonight", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/tiktok.svg?v=1755349397" },
    { label: "Email", href: "mailto:info@theneighbourhood.me", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/mail.svg?v=1755349401" },
    { label: "Threads", href: "https://threads.net/@ampmemonight", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/threads.svg?v=1755349406" },
    { label: "Spotify", href: "https://open.spotify.com/playlist/1o3TfNkUVdpGz8WP9kEunY?si=b5a2a62dc983408a", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/spotify.svg?v=1755349410" },
    { label: "Twitter", href: "https://twitter.com/ampmemonight", src: "https://cdn.shopify.com/s/files/1/2141/4575/files/twitter.svg?v=1755349413" },
  ];

  return (
    // filter: invert(1) flips the texture from dark→light, and text from white→dark
    // No background colour — the fixed body background shows straight through
    <footer style={{ filter: "invert(1)", padding: "40px 20px 60px", textAlign: "center" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.9)", marginBottom: "6px" }}>
          We throw parties for sad music
        </li>
        <li style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
          AM//PM is Australia&apos;s biggest touring emo night
        </li>
        <li style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ display: "flex", opacity: 0.8 }}
              >
                {/* No individual invert — the parent footer invert handles it */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label} width={18} height={18} />
              </a>
            ))}
          </div>
        </li>
        <li style={{ fontSize: "11px", letterSpacing: "1px", color: "rgba(255,255,255,0.5)", marginBottom: "6px" }}>
          © 2024 AM//PM Emo Night, The Neighbourhood
        </li>
        <li style={{ fontSize: "11px", letterSpacing: "1px" }}>
          <a href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 8px" }}>|</span>
          <a href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Terms &amp; Conditions</a>
        </li>
      </ul>
    </footer>
  );
}
