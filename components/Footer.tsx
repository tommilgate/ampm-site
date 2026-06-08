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

  const liStyle: React.CSSProperties = {
    margin: "10px 15px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "11.4px",
    color: "rgba(255,255,255,0.6)",
  };

  return (
    <footer style={{ padding: "20px 20px 60px", textAlign: "center", filter: "invert(1)" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={liStyle}>We throw parties for sad music</li>
        <li style={{ ...liStyle, color: "rgba(255,255,255,0.4)" }}>
          AM//PM is Australia&apos;s biggest touring emo night
        </li>
        <li style={{ margin: "10px 15px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ opacity: 0.7, display: "flex" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label} width={18} height={18} style={{ filter: "invert(1)" }} />
              </a>
            ))}
          </div>
        </li>
        <li style={{ ...liStyle, color: "rgba(255,255,255,0.3)" }}>
          © 2024 AM//PM Emo Night, The Neighbourhood
        </li>
        <li style={{ ...liStyle, color: "rgba(255,255,255,0.3)" }}>
          <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms &amp; Conditions</a>
        </li>
      </ul>
    </footer>
  );
}
