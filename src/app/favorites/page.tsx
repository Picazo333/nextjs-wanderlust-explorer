import { FavoritesView } from "@/components/FavoritesView";

export const metadata = {
  title: "Favorites",
  description:
    "Experiences saved during this visit. The list is kept in memory and clears on refresh.",
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
