// ============================================================================
//  MEDIA MANIFEST — the only file you need to edit to swap in your assets.
//
//  1. Drop your files into `public/` using the folders below.
//  2. If your file name differs, change the path in this file once.
//  3. Nothing else in the codebase references media paths directly.
//
//  Expected files (names follow the original assignment folder):
//    public/audio/Grace.mp3
//    public/audio/Last Goodbye.mp3
//    public/audio/Lover, You Should've Come Over.mp3
//    public/audio/Hallelujah.mp3
//    public/audio/So Real.mp3
//    public/video/lover-official.mp4
//       (original: "Jeff Buckley - Lover, You Should've Come Over (Official Video).mp4")
//    public/video/grace-official.mp4
//       (original: "Jeff Buckley - Grace (Official Video).mp4")
//    public/video/hero-loop.mp4          ← optional silent 8–15s loop for the hero
//
//  Images already in `public/images/` come from your original site; the
//  `placeholder-*.jpg` files are generated art you can replace one-for-one.
//  `lover-still.jpg` is your AVIF video still, cropped to remove the player's
//  white corner artifacts and the Vevo watermark strip.
// ============================================================================

const base = import.meta.env.BASE_URL;

/** Resolve a public/ path against Vite's base URL (subfolder-safe). */
export const asset = (path) => `${base}${String(path).replace(/^\/+/, "")}`;

export const media = {
  /** Grace album sleeve — 1:1, from the original site. */
  cover: asset("images/grace-cover.jpg"),
  /** Cropped video still, used as the hero poster and the video card poster. */
  heroPoster: asset("images/lover-still.jpg"),
  /** Silent background loop. Falls back to the poster if missing. */
  heroVideo: asset("video/hero-loop.mp4"),
};

export const tracks = [
  {
    id: "grace",
    title: "Grace",
    meta: "Title track · 1994",
    duration: "5:05",
    src: asset("audio/Grace.mp3"),
    note: "The opening statement — wide, unhurried, and built around a vocal that keeps climbing.",
  },
  {
    id: "last-goodbye",
    title: "Last Goodbye",
    meta: "Single · 1994",
    duration: "4:35",
    src: asset("audio/Last Goodbye.mp3"),
    note: "The most direct song on the record: a bright riff carrying a very plain kind of grief.",
  },
  {
    id: "lover",
    title: "Lover, You Should've Come Over",
    meta: "Album track · 1994",
    duration: "6:43",
    src: asset("audio/Lover, You Should've Come Over.mp3"),
    note: "The emotional centre. Listen for how the arrangement opens up as the voice does.",
  },
  {
    id: "hallelujah",
    title: "Hallelujah",
    meta: "Leonard Cohen cover · 1994",
    duration: "6:53",
    src: asset("audio/Hallelujah.mp3"),
    note: "An interpretation rather than a cover — restrained, then quietly overwhelming.",
  },
  {
    id: "so-real",
    title: "So Real",
    meta: "Album track · 1994",
    duration: "4:43",
    src: asset("audio/So Real.mp3"),
    note: "Texture and restraint: the band holding back so the voice can carry the weight.",
  },
];

export const videos = [
  {
    id: "lover-official",
    title: "Lover, You Should've Come Over",
    meta: "Official video · 1994",
    blurb:
      "Six minutes and forty-three seconds of a song that never resolves the way you expect it to.",
    poster: asset("images/lover-still.jpg"),
    src: asset("video/lover-official.mp4"),
    featured: true,
  },
  {
    id: "grace-official",
    title: "Grace",
    meta: "Official video · 1994",
    blurb:
      "The title track in motion — the record's opening statement, filmed.",
    poster: asset("images/grace-cover.jpg"),
    src: asset("video/grace-official.mp4"),
    featured: false,
  },
];

export const gallery = [
  {
    id: "sleeve",
    src: asset("images/grace-cover.jpg"),
    alt: "The Grace album sleeve: Jeff Buckley holding a microphone, looking down.",
    caption: "Grace — album sleeve",
    detail: "1994 · Columbia",
    ratio: "square",
  },
  {
    id: "lover-still",
    src: asset("images/lover-still.jpg"),
    alt: "Still frame from the Lover, You Should've Come Over video.",
    caption: "Lover, You Should've Come Over",
    detail: "Still from the official video",
    ratio: "portrait",
  },
  {
    id: "study-01",
    src: asset("images/placeholder-01.jpg"),
    alt: "Abstract study in bronze light and deep shadow.",
    caption: "Light study I",
    detail: "Placeholder artwork",
    ratio: "landscape",
  },
  {
    id: "study-02",
    src: asset("images/placeholder-02.jpg"),
    alt: "Abstract study in cool steel light.",
    caption: "Light study II",
    detail: "Placeholder artwork",
    ratio: "portrait",
  },
  {
    id: "study-03",
    src: asset("images/placeholder-03.jpg"),
    alt: "Abstract study of a warm horizon line in darkness.",
    caption: "Light study III",
    detail: "Placeholder artwork",
    ratio: "landscape",
  },
  {
    id: "study-04",
    src: asset("images/placeholder-04.jpg"),
    alt: "Abstract study of soft grain and drifting light.",
    caption: "Light study IV",
    detail: "Placeholder artwork",
    ratio: "square",
  },
];
