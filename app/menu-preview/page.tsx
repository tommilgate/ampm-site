"use client";

const links = ["EVENTS", "PHOTOS", "MERCH"];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: "#fff", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.55, marginBottom: 14, textAlign: "center", fontFamily: "var(--font-jost), sans-serif" }}>
      {children}
    </div>
  );
}

function Rows() {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
      {links.map((l, i) => (
        <li key={l} style={{ padding: "20px 28px", textAlign: "center", color: "#fff", fontSize: 18, fontWeight: 600, letterSpacing: 3, fontFamily: "var(--font-jost), sans-serif", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>{l}</li>
      ))}
    </ul>
  );
}

const panelBase: React.CSSProperties = {
  position: "relative", overflow: "hidden", borderRadius: 16, minWidth: 260,
};

/* 1 — Obsidian: near-black tint, faint top highlight, subtle hairline border */
function Obsidian() {
  return (
    <div style={{ ...panelBase,
      background: "rgba(10,10,12,0.55)",
      backdropFilter: "blur(20px) saturate(140%)", WebkitBackdropFilter: "blur(20px) saturate(140%)",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 14px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
      <Rows />
    </div>
  );
}

/* 2 — Smoke: dark gradient glass (charcoal -> black), soft, more see-through */
function Smoke() {
  return (
    <div style={{ ...panelBase,
      background: "linear-gradient(180deg, rgba(35,35,38,0.5), rgba(8,8,9,0.6))",
      backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 14px 40px rgba(0,0,0,0.5)" }}>
      <Rows />
    </div>
  );
}

/* 3 — Onyx: glossy black, strong top specular sheen (piano-finish) */
function Onyx() {
  return (
    <div style={{ ...panelBase,
      background: "rgba(6,6,8,0.62)",
      backdropFilter: "blur(18px) saturate(120%)", WebkitBackdropFilter: "blur(18px) saturate(120%)",
      border: "1px solid rgba(255,255,255,0.16)",
      boxShadow: "0 16px 44px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.14), transparent)", pointerEvents: "none" }} />
      <Rows />
    </div>
  );
}

/* 4 — Ink (corner glow on black): your crystal panel but dark base */
function Ink() {
  return (
    <div style={{ ...panelBase,
      background: "rgba(12,12,14,0.5)",
      backdropFilter: "blur(20px) saturate(150%)", WebkitBackdropFilter: "blur(20px) saturate(150%)",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 14px 40px rgba(0,0,0,0.55)" }}>
      <div aria-hidden style={{ position: "absolute", top: -50, left: -50, width: 200, height: 200, background: "radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)", pointerEvents: "none" }} />
      <Rows />
    </div>
  );
}

function Pill({ variant }: { variant: 1 | 2 | 3 | 4 }) {
  const base: React.CSSProperties = { padding: "16px 40px", borderRadius: 30, color: "#fff", fontSize: 16, fontWeight: 600, letterSpacing: 3, fontFamily: "var(--font-jost), sans-serif" };
  const styles: Record<number, React.CSSProperties> = {
    1: { ...base, background: "rgba(10,10,12,0.55)", backdropFilter: "blur(20px) saturate(140%)", WebkitBackdropFilter: "blur(20px) saturate(140%)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)" },
    2: { ...base, background: "linear-gradient(180deg, rgba(35,35,38,0.5), rgba(8,8,9,0.6))", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,0.08)" },
    3: { ...base, background: "rgba(6,6,8,0.62)", backdropFilter: "blur(18px) saturate(120%)", WebkitBackdropFilter: "blur(18px) saturate(120%)", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 8px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)" },
    4: { ...base, background: "rgba(12,12,14,0.5)", backdropFilter: "blur(20px) saturate(150%)", WebkitBackdropFilter: "blur(20px) saturate(150%)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" },
  };
  return <div style={styles[variant]}>MENU</div>;
}

export default function MenuPreview() {
  const cols: [string, React.ReactNode, 1 | 2 | 3 | 4][] = [
    ["1 · OBSIDIAN", <Obsidian key="o" />, 1],
    ["2 · SMOKE", <Smoke key="s" />, 2],
    ["3 · ONYX (glossy)", <Onyx key="on" />, 3],
    ["4 · INK (corner glow)", <Ink key="i" />, 4],
  ];
  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px 120px" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundImage: "url(/BACKGROUND_1.webp)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <h1 style={{ color: "#fff", textAlign: "center", fontSize: 14, letterSpacing: 3, opacity: 0.6, marginBottom: 40, fontFamily: "var(--font-jost), sans-serif" }}>DARK GLASS OPTIONS</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28, alignItems: "start", maxWidth: 1400, margin: "0 auto" }}>
        {cols.map(([label, panel, v]) => (
          <div key={label}><Label>{label}</Label><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}><Pill variant={v} />{panel}</div></div>
        ))}
      </div>
    </div>
  );
}
