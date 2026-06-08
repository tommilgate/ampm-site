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
    <footer style={{ background: "#000", padding: "40px 20px 60px", textAlign: "center" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
        <li style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>
          WE THROW PARTIES FOR SAD MUSIC
        </li>
        <li style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "24px" }}>
          AM//PM IS AUSTRALIA&apos;S BIGGEST TOURING EMO NIGHT
        </li>
        <li>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
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
        <li style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", marginBottom: "6px" }}>
          © 2024 AM//PM Emo Night, The Neighbourhood
        </li>
        <li style={{ fontSize: "11px" }}>
          <a href="/privacy" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>|</span>
          <a href="/terms" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms &amp; Conditions</a>
        </li>
      </ul>
    </footer>
  );
}
