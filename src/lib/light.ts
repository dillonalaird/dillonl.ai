/**
 * "Changing light": the site's paintings, each placed at the hour of day it
 * depicts, with a small palette sampled from the canvas. `accent` is dark
 * enough to read as text on paper; `shade` is the painting's deep tone, used
 * behind the image while it loads and for the scrubber track.
 */
export type Painting = {
  id: string;
  src: string;
  artist: string;
  title: string;
  year: string;
  medium: string;
  /** canonical hour (0–24) the painting stands for */
  hour: number;
  /** focal point for object-position when the canvas is cropped */
  focus: string;
  accent: string;
  shade: string;
  href?: string;
};

export const PAINTINGS = {
  pathless: {
    id: "pathless",
    src: "/assets/art.jpg",
    artist: "Bev Byrnes",
    title: "Pathless Path",
    year: "",
    medium: "ink and tea stain on Kumohadamashi paper",
    hour: 12,
    focus: "50% 50%",
    accent: "#8a6a48",
    shade: "#3b3a34",
    href: "https://theawakenedeye.com/artisans/bev-byrnes/",
  },
  sunrise: {
    id: "sunrise",
    src: "/assets/art/monet-impression-sunrise.jpg",
    artist: "Claude Monet",
    title: "Impression, Sunrise",
    year: "1872",
    medium: "oil on canvas",
    hour: 7,
    focus: "58% 45%",
    accent: "#ad4a26",
    shade: "#4c5c58",
  },
  poplars: {
    id: "poplars",
    src: "/assets/art/monet-poplars-autumn.jpg",
    artist: "Claude Monet",
    title: "Poplars (Autumn)",
    year: "1891",
    medium: "oil on canvas",
    hour: 11,
    focus: "50% 40%",
    accent: "#8c5a17",
    shade: "#55663f",
  },
  fog: {
    id: "fog",
    src: "/assets/art/monet-parliament-fog.jpg",
    artist: "Claude Monet",
    title: "The Houses of Parliament (Effect of Fog)",
    year: "1903",
    medium: "oil on canvas",
    hour: 14.5,
    focus: "45% 50%",
    accent: "#3d5d6e",
    shade: "#2f3d44",
  },
  lavacourt: {
    id: "lavacourt",
    src: "/assets/art/monet-sunset-lavacourt.jpg",
    artist: "Claude Monet",
    title: "Sunset on the Seine at Lavacourt, Winter Effect",
    year: "1880",
    medium: "oil on canvas",
    hour: 17,
    focus: "55% 50%",
    accent: "#9c4f2c",
    shade: "#394344",
  },
  sunset: {
    id: "sunset",
    src: "/assets/art/monet-parliament-sunset.jpg",
    artist: "Claude Monet",
    title: "The Houses of Parliament, Sunset",
    year: "1903",
    medium: "oil on canvas",
    hour: 19,
    focus: "42% 50%",
    accent: "#235a8a",
    shade: "#1d3c5a",
  },
  twilight: {
    id: "twilight",
    src: "/assets/art/monet-san-giorgio-twilight.jpg",
    artist: "Claude Monet",
    title: "San Giorgio Maggiore at Dusk",
    year: "1908–1912",
    medium: "oil on canvas",
    hour: 21.5,
    focus: "22% 50%",
    accent: "#a2561b",
    shade: "#3a3047",
  },
  charing: {
    id: "charing",
    src: "/assets/art/monet-charing-cross.jpg",
    artist: "Claude Monet",
    title: "Charing Cross Bridge",
    year: "c. 1900",
    medium: "oil on canvas",
    hour: 10,
    focus: "50% 50%",
    accent: "#665e78",
    shade: "#5f5c66",
  },
} satisfies Record<string, Painting>;

export type PaintingId = keyof typeof PAINTINGS;

/** The day, in order. Each painting holds the light from its `from` hour. */
export const DAY: { id: PaintingId; from: number }[] = [
  { id: "sunrise", from: 5 },
  { id: "poplars", from: 9.5 },
  { id: "fog", from: 13 },
  { id: "lavacourt", from: 16 },
  { id: "sunset", from: 18 },
  { id: "twilight", from: 20.5 },
];

export function wrapHour(h: number) {
  return ((h % 24) + 24) % 24;
}

/** Index into DAY for a given hour (wraps past midnight to twilight). */
export function dayIndexForHour(hour: number) {
  const h = wrapHour(hour);
  let idx = DAY.length - 1; // before 05:00 is still night
  for (let i = 0; i < DAY.length; i++) if (h >= DAY[i].from) idx = i;
  return idx;
}

export function caption(p: Painting) {
  return `${p.artist} — ${p.title}${p.year ? `, ${p.year}` : ""}, ${p.medium}`;
}

export function formatHour(hour: number) {
  const h = wrapHour(hour);
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const fix = mm === 60 ? [hh + 1, 0] : [hh, mm];
  return `${String(fix[0] % 24).padStart(2, "0")}:${String(fix[1]).padStart(2, "0")}`;
}
