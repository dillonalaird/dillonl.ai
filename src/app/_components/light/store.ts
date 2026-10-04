"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  DAY,
  PAINTINGS,
  dayIndexForHour,
  type Painting,
  type PaintingId,
} from "@/lib/light";

/**
 * A tiny shared store for the light: the current hour (set from the
 * visitor's clock, advanced by scrolling) and an
 * optional hover preview that temporarily overrides it.
 */
type State = {
  hour: number;
  preview: PaintingId | null;
  /** +1 when the light moves forward through the day, -1 when it goes back */
  dir: 1 | -1;
  ready: boolean;
};

let state: State = { hour: 14.5, preview: null, dir: 1, ready: false };
const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const light = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** First visit of the session: take the light from the visitor's clock. */
  init() {
    if (state.ready) return;
    const now = new Date();
    set({ hour: now.getHours() + now.getMinutes() / 60, ready: true });
  },
  /** Step the light by whole paintings (scrolling between sections). */
  step(delta: number) {
    if (!delta) return;
    const n = DAY.length;
    const i = (((dayIndexForHour(state.hour) + delta) % n) + n) % n;
    set({ hour: PAINTINGS[DAY[i].id].hour, dir: delta > 0 ? 1 : -1 });
  },
  setPreview(preview: PaintingId | null) {
    if (preview !== state.preview) set({ preview });
  },
};

const serverState = state;

export function useLight() {
  return useSyncExternalStore(light.subscribe, light.get, () => serverState);
}

export function currentPainting(s: State): Painting {
  return PAINTINGS[s.preview ?? DAY[dayIndexForHour(s.hour)].id];
}

export function applyAccent(p: Painting) {
  const root = document.documentElement.style;
  root.setProperty("--accent", p.accent);
  root.setProperty("--shade", p.shade);
}

/** Section pages: give the page its own light, sampled from its hero. */
export function PageLight({ id }: { id: PaintingId }) {
  useEffect(() => {
    applyAccent(PAINTINGS[id]);
  }, [id]);
  return null;
}
