export type Release = {
  title: string;
  type: string;
  year: string;
  description: string;
  highlights: string[];
  href: string;
};

export const releases: Release[] = [
  {
    title: "Midnight Reverie",
    type: "LP",
    year: "2023",
    description:
      "A smoky blend of neo-soul and electronica, crafted in collaboration with underground beatmakers from Tokyo and Berlin.",
    highlights: ["#3 on Indie Soul Charts", "BBC Radio 1 Feature"],
    href: "#",
  },
  {
    title: "Paper Lanterns",
    type: "EP",
    year: "2022",
    description:
      "Five-track exploration of intimate ballads with lush string arrangements and analog synth textures.",
    highlights: ["1M+ Streams", "Featured on Spotify's Fresh Finds"],
    href: "#",
  },
  {
    title: "City Sketches",
    type: "Single",
    year: "2024",
    description:
      "Warm lo-fi groove capturing the after-hours glow of Shibuya with live saxophone improvisation.",
    highlights: ["NPR Tiny Desk Contest Finalist"],
    href: "#",
  },
];

export type Show = {
  date: string;
  city: string;
  venue: string;
  note: string;
};

export const upcomingShows: Show[] = [
  {
    date: "2024-07-18",
    city: "Tokyo, JP",
    venue: "Velvet Lounge",
    note: "Sold Out - Late Show",
  },
  {
    date: "2024-08-02",
    city: "Osaka, JP",
    venue: "Blue Canvas Club",
    note: "With special guest DJ Nightshade",
  },
  {
    date: "2024-09-14",
    city: "Seoul, KR",
    venue: "Aurora Hall",
    note: "Tickets available now",
  },
  {
    date: "2024-10-05",
    city: "Los Angeles, US",
    venue: "Echo Park Sessions",
    note: "Part of Golden Hour Festival",
  },
];

export type Feature = {
  label: string;
  description: string;
};

export const features: Feature[] = [
  {
    label: "Tiny Desk Finalist",
    description: "One of ten artists featured in NPR's 2024 Tiny Desk Contest finale showcase.",
  },
  {
    label: "Residency",
    description: "Three-month residency at Midnight Sun Studios exploring modular synth improvisation.",
  },
  {
    label: "Composer",
    description: 'Scored the indie short film "Streets of Paper" premiering at Raindance 2023.',
  },
];

export type ContactLink = {
  label: string;
  handle: string;
  href: string;
};

export const contactLinks: ContactLink[] = [
  { label: "Instagram", handle: "@hibiki.sound", href: "#" },
  { label: "Spotify", handle: "Listen on Spotify", href: "#" },
  { label: "YouTube", handle: "Live Sessions", href: "#" },
  { label: "Management", handle: "booking@hibikimusic.com", href: "mailto:booking@hibikimusic.com" },
];
