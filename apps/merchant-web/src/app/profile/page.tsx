import React from "react";
import ProfileManagement from "@/components/profile-management/ProfileManagement";
import { ProfileProvider } from "@/contexts/profile/ProfileContext";

export default function Page() {
  return (
    <ProfileProvider>
      <main>
        <ProfileManagement />
      </main>
    </ProfileProvider>
  );
}
