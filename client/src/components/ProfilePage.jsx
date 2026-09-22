import { LifestyleProfileForm } from "./LifestyleProfileForm";
import { LandlordListingForm } from "./LandlordListingForm";

export function ProfilePage({ user, onProfileSaved }) {
  if (user?.role === "landlord") {
    return (
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <LandlordListingForm user={user} onListingSaved={onProfileSaved} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <LifestyleProfileForm user={user} onProfileSaved={onProfileSaved} />
    </div>
  );
}
