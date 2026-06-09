export default function Footer({ dark = false }: { dark?: boolean }) {
  // Color scheme: default = light inverted texture w/ dark text (homepage),
  // dark = solid black w/ white text & icons (events page).
  const c = {
    tagline: dark ? "#fff" : "#111",
    sub: dark ? "rgba(255,255,255,0.6)" : "#333",
    icon: dark ? "#fff" : "#111",
    meta: dark ? "rgba(255,255,255,0.5)" : "#333",
    sep: dark ? "rgba(255,255,255,0.3)" : "#333",
  };

  const socials = [
    {
      label: "Instagram",
      href: "https://instagram.com/ampmemonight",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    },
    {
      label: "Facebook",
      href: "https://facebook.com/ampmemonight",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@ampmemonight",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
    },
    {
      label: "Email",
      href: "mailto:info@theneighbourhood.me",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    },
    {
      label: "Threads",
      href: "https://threads.net/@ampmemonight",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.554 9.63c.898-1.685 2.62-2.692 4.514-2.692h.008c3.213.017 5.058 2.019 5.403 5.67.502.181.96.43 1.371.742 1.296.985 2.059 2.438 2.117 4.012.1 2.82-.842 5.044-2.72 6.467C16.738 24.958 14.65 24 12.186 24z"/></svg>,
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/playlist/1o3TfNkUVdpGz8WP9kEunY?si=b5a2a62dc983408a",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/ampmemonight",
      svg: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>,
    },
  ];

  return (
    <footer
      style={{
        // Default: own pre-inverted texture (homepage). Dark: solid black (events page).
        ...(dark
          ? { background: "#000" }
          : {
              backgroundImage: "url(/BACKGROUND_inverted.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
        // extra bottom padding in dark mode (events page) so the floating MENU clears the text
        padding: dark ? "22px 24px 96px" : "22px 24px 24px",
        textAlign: "center",
      }}
    >
      {/* Main tagline — serif (Tinos / Times) */}
      <p style={{
        fontFamily: "var(--font-tinos), 'Times New Roman', serif",
        fontSize: "15px",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: c.tagline,
        margin: "0 0 4px",
        lineHeight: 1.2,
      }}>
        We throw parties for sad music
      </p>
      {/* Subtext — sans */}
      <p style={{
        fontFamily: "var(--font-jost), sans-serif",
        fontSize: "10px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: c.sub,
        margin: "0 0 16px",
      }}>
        AM//PM is Australia&apos;s biggest touring emo night
      </p>

      {/* Social icons */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
        marginBottom: "16px",
      }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{ color: c.icon, display: "flex", width: 18, height: 18 }}
          >
            {s.svg}
          </a>
        ))}
      </div>

      {/* Copyright — sans */}
      <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "10px", letterSpacing: "0.5px", color: c.meta, margin: "0 0 4px" }}>
        © {new Date().getFullYear()} AM//PM Emo Night, The Neighbourhood
      </p>
      <p style={{ fontFamily: "var(--font-jost), sans-serif", fontSize: "10px", letterSpacing: "0.5px", color: c.meta, margin: 0 }}>
        <a href="/privacy" style={{ color: c.meta, textDecoration: "none" }}>Privacy Policy</a>
        <span style={{ margin: "0 6px", color: c.sep }}>|</span>
        <a href="/terms" style={{ color: c.meta, textDecoration: "none" }}>Terms &amp; Conditions</a>
      </p>
    </footer>
  );
}
