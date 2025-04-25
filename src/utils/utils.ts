import { defaultLocations } from "./constants";
import { CardData } from "../types/interfaces";

export function getWindDirection(deg: number): string {
  const normalizedDeg = ((deg % 360) + 360) % 360;

  if (normalizedDeg >= 337.5 || normalizedDeg < 22.5) return "Северный";
  if (normalizedDeg >= 22.5 && normalizedDeg < 67.5) return "Северо-восточный";
  if (normalizedDeg >= 67.5 && normalizedDeg < 112.5) return "Восточный";
  if (normalizedDeg >= 112.5 && normalizedDeg < 157.5) return "Юго-восточный";
  if (normalizedDeg >= 157.5 && normalizedDeg < 202.5) return "Южный";
  if (normalizedDeg >= 202.5 && normalizedDeg < 247.5) return "Юго-западный";
  if (normalizedDeg >= 247.5 && normalizedDeg < 292.5) return "Западный";
  if (normalizedDeg >= 292.5 && normalizedDeg < 337.5) return "Северо-западный";

  return "Неизвестно";
}

export function loadCardsFromStorage(): CardData[] {
  const savedCards = localStorage.getItem("weatherCards");
  return savedCards ? JSON.parse(savedCards) : defaultLocations;
}

export function saveCardsToStorage(cards: CardData[]) {
  localStorage.setItem("weatherCards", JSON.stringify(cards));
}
