"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveButtonColor } from "@/app/admin/actions";
import { DEFAULT_BUTTON_COLOR, contrastText, isValidHex } from "@/lib/color";

export default function ButtonColorPicker({ initial }: { initial: string }) {
  const router = useRouter();
  const [color, setColor] = useState(isValidHex(initial) ? initial : DEFAULT_BUTTON_COLOR);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save(hex: string) {
    if (!isValidHex(hex)) return;
    setSaving(true);
    setSaved(false);
    try {
      await saveButtonColor(hex);
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      {/* swatch / native picker */}
      <input
        id="admin-button-color"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onBlur={(e) => save(e.target.value)}
        style={{ width: 46, height: 38, padding: 0, border: "1px solid #2a2a2a", borderRadius: 8, background: "#111", cursor: "pointer" }}
      />
      {/* hex text input */}
      <input
        aria-label="Hex colour"
        value={color}
        onChange={(e) => setColor(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)}
        onBlur={(e) => save(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") save((e.target as HTMLInputElement).value); }}
        spellCheck={false}
        style={{ width: 110, padding: "9px 11px", borderRadius: 8, background: "#111", border: "1px solid #2a2a2a", color: "#fff", fontSize: 14, outline: "none", fontFamily: "monospace" }}
      />
      {/* live preview */}
      <span
        style={{
          fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
          padding: "10px 18px", borderRadius: 7, whiteSpace: "nowrap",
          background: isValidHex(color) ? color : DEFAULT_BUTTON_COLOR,
          color: contrastText(isValidHex(color) ? color : DEFAULT_BUTTON_COLOR),
        }}
      >
        Tickets
      </span>
      <button
        type="button"
        onClick={() => save(color)}
        disabled={saving || !isValidHex(color)}
        style={{ padding: "9px 16px", borderRadius: 8, background: "#fe5859", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontSize: 12, border: "none", cursor: "pointer", opacity: saving || !isValidHex(color) ? 0.6 : 1 }}
      >
        {saving ? "Saving…" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => { setColor(DEFAULT_BUTTON_COLOR); save(DEFAULT_BUTTON_COLOR); }}
        style={{ padding: "9px 12px", borderRadius: 8, background: "none", border: "1px solid #333", color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}
      >
        Reset
      </button>
      {saved && <span style={{ color: "#4ade80", fontSize: 13 }}>✓ Saved</span>}
    </div>
  );
}
