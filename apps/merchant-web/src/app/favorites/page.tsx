"use client";

import { ThemeProvider } from "@/commons/context/ThemeContext";
import {FavoriteSectionComponent} from "@/components/favorites-section/FavoriteSectionComponent";

export default function FavoritesSectionPage() {
  return (
    <ThemeProvider>
      <main>
        <FavoriteSectionComponent />
      </main>
    </ThemeProvider>
  );
}
