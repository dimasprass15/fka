export interface StaticPosterDef {
  id: number;
  key: "tahfidz" | "fiqih" | "tafsir" | "hadits" | "aqidah" | "bahasaArab" | "ushulFiqih" | "sirah";
  image: string;
  category: string;
  status: "open" | "closed";
}

export const posterDefsStatic: StaticPosterDef[] = [
  { id: 1, key: "tahfidz", image: "/1.jpeg", category: "quran", status: "open" },
  { id: 2, key: "fiqih", image: "/2.jpeg", category: "fiqh", status: "open" },
  { id: 3, key: "tafsir", image: "/3.jpeg", category: "quran", status: "closed" },
  { id: 4, key: "hadits", image: "/4.jpeg", category: "quran", status: "closed" },
  { id: 5, key: "aqidah", image: "/5.jpeg", category: "daurah", status: "open" },
  { id: 6, key: "bahasaArab", image: "/6.jpeg", category: "bahasa", status: "closed" },
  { id: 7, key: "ushulFiqih", image: "/7.jpeg", category: "fiqh", status: "open" },
  { id: 8, key: "sirah", image: "/8.jpeg", category: "daurah", status: "closed" },
];

