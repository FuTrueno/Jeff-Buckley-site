import { Disc3, Mic, Guitar, Feather, Sparkles, Headphones } from "lucide-react";

// ============================================================================
//  Site content — copy lives here so the components stay presentational.
// ============================================================================

export const nav = [
  { label: "Home", to: "/" },
  { label: "Information", to: "/information" },
  { label: "Listening Form", to: "/listening-form" },
];

export const heroRotating = [
  "singer",
  "songwriter",
  "guitarist",
  "a voice still in the room",
];

export const stats = [
  { value: "1994", label: "Grace released" },
  { value: "10", label: "Tracks on the record" },
  { value: "01", label: "Completed studio album" },
  { value: "1966–1997", label: "Jeff Buckley" },
];

export const marqueeWords = [
  "Grace",
  "Last Goodbye",
  "Lover, You Should've Come Over",
  "Hallelujah",
  "So Real",
  "Mojo Pin",
  "Dream Brother",
  "Eternal Life",
];

export const story = {
  eyebrow: "The record",
  title: "One record. Still in the room.",
  paragraphs: [
    "Jeff Buckley was an American singer, songwriter, and guitarist whose work combined intimate songwriting with an unusually expressive vocal style. His album Grace remains the central point of his recorded legacy.",
    "Released in 1994, Grace introduced a blend of alternative rock, folk, soul, and carefully arranged guitar work. It moves between intimate acoustic passages, full-band arrangements, and vocals that treat range as an emotional instrument rather than a display.",
    "He died in 1997, at thirty. What remains is a small, deliberate body of work — and a record that listeners keep returning to, and keep handing to each other.",
  ],
  pull: "Not a genre so much as a room you are let into.",
};

export const features = [
  {
    id: "grace-era",
    icon: Disc3,
    kicker: "1994 · Columbia",
    title: "The Grace Era",
    body: "Grace introduced a distinctive blend of alternative rock, folk, soul, and carefully arranged guitar work — songs such as “Last Goodbye,” “Grace,” and “Lover, You Should've Come Over.”",
    detail: "The only studio album completed in his lifetime.",
  },
  {
    id: "voice",
    icon: Mic,
    kicker: "Range as language",
    title: "A voice like no other",
    body: "An unusually expressive vocal style: the falsetto, the break in the middle of a phrase, the moment a whisper becomes a full-throated climb without ever sounding like a technique.",
    detail: "Listen for breath control — not just high notes.",
  },
  {
    id: "guitar",
    icon: Guitar,
    kicker: "Six strings, many rooms",
    title: "Guitar and arrangement",
    body: "Fingerpicked intimacy on one track, a full band lifting the next. The arrangements are careful without ever feeling cautious — every part leaves space for the voice.",
    detail: "Standard tuning, unusual patience.",
  },
  {
    id: "writing",
    icon: Feather,
    kicker: "Songwriting",
    title: "Songs as confessions",
    body: "The writing is intimate and direct, and it trusts the listener. A song is treated as a room you are let into rather than a performance you are asked to admire.",
    detail: "Plain language, held for a long time.",
  },
  {
    id: "legacy",
    icon: Sparkles,
    kicker: "After",
    title: "Legacy and influence",
    body: "A short catalogue that keeps producing new listeners. Grace is passed between friends the way records used to be — by someone saying, without much explanation, just listen to this.",
    detail: "Still finding people thirty years on.",
  },
  {
    id: "listen",
    icon: Headphones,
    kicker: "How to begin",
    title: "How to listen",
    body: "Start with the album in order, headphones on, no interruptions. Notice how the arrangements and vocal intensity change from song to song — the album is built as a complete listening experience.",
    detail: "Forty-six minutes, once, properly.",
  },
];

export const songs = [
  {
    title: "Grace",
    release: "Grace",
    focus: "Original song and title track",
    trackId: "grace",
  },
  {
    title: "Last Goodbye",
    release: "Grace",
    focus: "Alternative rock / singer-songwriter",
    trackId: "last-goodbye",
  },
  {
    title: "Lover, You Should've Come Over",
    release: "Grace",
    focus: "Emotional ballad",
    trackId: "lover",
  },
  {
    title: "Hallelujah",
    release: "Grace",
    focus: "Interpretation of Leonard Cohen's song",
    trackId: "hallelujah",
  },
  {
    title: "So Real",
    release: "Grace",
    focus: "Texture and restraint",
    trackId: "so-real",
  },
];

export const information = {
  eyebrow: "Information",
  title: "The story behind Grace",
  standfirst:
    "A closer look at the record, the voice, and the choices that make it sound the way it does.",
  paragraphs: [
    "Grace was Jeff Buckley's only completed studio album released during his lifetime. Its songs move between intimate acoustic passages, full-band arrangements, and highly expressive vocals. Rather than fitting neatly into one genre, the album draws from rock, folk, soul, and singer-songwriter traditions.",
    "The record became especially associated with Buckley's interpretations of songs as well as his original writing. “Lover, You Should've Come Over” demonstrates the emotional and lyrical side of the album, while “Grace” and “Last Goodbye” show its wider range.",
  ],
  aside:
    "The best way to approach the album is as a complete listening experience. Notice how the arrangements and vocal intensity change from song to song.",
  notes: [
    {
      label: "Released",
      value: "1994 — Columbia",
    },
    {
      label: "Written and recorded",
      value: "Woodstock, New York",
    },
    {
      label: "Reach",
      value: "One completed studio album",
    },
    {
      label: "Listen",
      value: "Start to finish, in order",
    },
  ],
};

export const quote = {
  text: "It's never over — all my blood for the sweetness of her laughter.",
  source: "Lover, You Should've Come Over",
  meta: "Grace · 1994",
};

export const formIntro = {
  eyebrow: "Listening session",
  title: "Tell us what you want to hear.",
  body: "A sample registration form for a fictional Jeff Buckley listening session. Front-end only — nothing is stored, sent, or shared.",
};
