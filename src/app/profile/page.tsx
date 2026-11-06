import { ProfileView } from "@/components/ProfileView";

export const metadata = {
  title: "Profile",
  description:
    "Sample traveler profile for this exercise, plus the number of favorites saved in this visit.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
