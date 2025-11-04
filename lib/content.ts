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
      "東京とベルリンのアンダーグラウンド・ビートメイカーと共作した、ネオソウルとエレクトロニカが煙るように溶け合うアルバム。",
    highlights: ["Indie Soulチャートで3位", "BBC Radio 1で特集"],
    href: "#",
  },
  {
    title: "Paper Lanterns",
    type: "EP",
    year: "2022",
    description:
      "アナログシンセの質感と豊かなストリングスが包み込む、親密なバラードを収めた全5曲のEP。",
    highlights: ["ストリーミング累計100万回超", "Spotify『Fresh Finds』掲載"],
    href: "#",
  },
  {
    title: "City Sketches",
    type: "Single",
    year: "2024",
    description:
      "渋谷の深夜の光をすくい取るウォームなローファイ・グルーヴ。ライブ録音のサックス即興をフィーチャー。",
    highlights: ["NPR Tiny Desk Contest ファイナリスト"],
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
    note: "完売（レイトショー）",
  },
  {
    date: "2024-08-02",
    city: "Osaka, JP",
    venue: "Blue Canvas Club",
    note: "スペシャルゲストDJ Nightshade出演",
  },
  {
    date: "2024-09-14",
    city: "Seoul, KR",
    venue: "Aurora Hall",
    note: "チケット発売中",
  },
  {
    date: "2024-10-05",
    city: "Los Angeles, US",
    venue: "Echo Park Sessions",
    note: "Golden Hour Festival内公演",
  },
];

export type Feature = {
  label: string;
  description: string;
};

export const features: Feature[] = [
  {
    label: "Tiny Desk Finalist",
    description: "NPR 2024 Tiny Desk Contestのファイナル・ショーケースに選出された10組のひとり。",
  },
  {
    label: "Residency",
    description: "Midnight Sun Studiosで3か月のレジデンシーを行い、モジュラーシンセの即興を追究。",
  },
  {
    label: "Composer",
    description: '短編映画「Streets of Paper」（Raindance 2023公開）で音楽を担当。',
  },
];

export type ContactLink = {
  label: string;
  handle: string;
  href: string;
};

export const contactLinks: ContactLink[] = [
  { label: "Instagram", handle: "@hibiki.sound", href: "#" },
  { label: "Spotify", handle: "Spotifyで聴く", href: "#" },
  { label: "YouTube", handle: "ライブセッション", href: "#" },
  { label: "Management", handle: "booking@hibikimusic.com", href: "mailto:booking@hibikimusic.com" },
];

export type BlogPost = {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  readingTimeMinutes: number;
};

export const blogPosts: BlogPost[] = [
  {
    title: "夜明け前のスタジオ日記",
    slug: "studio-dawn-journal",
    publishedAt: "2024-05-28",
    excerpt:
      "新作EPのレコーディングが夜明け前に差し掛かったとき、テープに残った偶然のハミングが曲の核になった話。",
    category: "制作メモ",
    readingTimeMinutes: 4,
  },
  {
    title: "黄昏サウンドの作り方",
    slug: "twilight-sound-notes",
    publishedAt: "2024-04-17",
    excerpt:
      "ライブで使用しているロータリースピーカーとアナログディレイを組み合わせ、空気感を描き出すためのセットアップ。",
    category: "機材",
    readingTimeMinutes: 6,
  },
  {
    title: "ベルリン滞在で見つけた音",
    slug: "berlin-field-notes",
    publishedAt: "2024-03-02",
    excerpt:
      "路面電車のモーター音や雨上がりの水たまりの反射から新曲のモチーフが生まれた、ベルリン滞在中のフィールドレコーディング記録。",
    category: "旅",
    readingTimeMinutes: 5,
  },
];
