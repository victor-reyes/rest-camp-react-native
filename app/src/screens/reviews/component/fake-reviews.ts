import { Review } from "../types";

export const REVIEWS: Review[] = [
  {
    id: "1",
    restAreaId: "ra1",
    ownerId: "1",
    score: 5,
    recension: "Fantastisk plats för en paus! Väldigt rent och trevligt.",
    updatedAt: Date.now() - 1000000,
  },
  {
    id: "2",
    restAreaId: "ra2",
    ownerId: "2",
    score: 4,
    recension:
      "Bra faciliteter men lite bullrigt nära vägen. Mycket gräsytor för barnen och hunden. Dessutom finns det en liten lekplats och grillplats för picknick.",
    updatedAt: Date.now() - 2000000,
  },
  {
    id: "3",
    restAreaId: "ra3",
    ownerId: "3",
    score: 3,
    recension: "Helt okej, men kunde varit bättre städning.",
    updatedAt: Date.now() - 3000000,
  },
  {
    id: "4",
    restAreaId: "ra4",
    ownerId: "4",
    score: 2,
    recension: "Få sittplatser och trasiga toaletter.",
    updatedAt: Date.now() - 4000000,
  },
  {
    id: "5",
    restAreaId: "ra5",
    ownerId: "5",
    score: 5,
    recension: "Supermysigt och barnvänligt! Rekommenderas.",
    updatedAt: Date.now() - 5000000,
  },
];

const getRandomAvatarUrl = () => `https://i.pravatar.cc/100?u=${Math.random()}`;

export const PROFILES = [
  { id: "1", fullName: "Anna Andersson", avatarUrl: `loading` },
  { id: "2", fullName: "Bertil Berg", avatarUrl: getRandomAvatarUrl() },
  { id: "3", fullName: "Carina Carlsson", avatarUrl: undefined },
  { id: "4", fullName: "David Dahl", avatarUrl: getRandomAvatarUrl() },
  { id: "5", fullName: "Eva Ek", avatarUrl: getRandomAvatarUrl() },
];
