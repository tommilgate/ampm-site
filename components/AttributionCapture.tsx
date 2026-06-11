"use client";

import { useEffect } from "react";
import { saveTrackedParams } from "@/lib/attribution";

// Runs on every page so first-touch UTMs/click ids are captured no matter where
// an ad click lands — they're read back by TrackedLink on outbound ticket links.
export default function AttributionCapture() {
  useEffect(() => {
    saveTrackedParams();
  }, []);
  return null;
}
