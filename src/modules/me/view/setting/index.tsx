import { useState } from "react";
import { Separator } from "@/ui/components/ui/separator";
import { MembersSettings, ProfileSettings, SettingsSidebar } from "./components";

function Page() {
  const [activeComponent, setActiveComponent] = useState("Profile");

  const renderContent = () => {
    switch (activeComponent) {
      case "Account":
        return <ProfileSettings />;
      case "Notifications":
        return <MembersSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <aside className="md:col-span-1">
          <SettingsSidebar activeItem={activeComponent} setActiveItem={setActiveComponent} />
        </aside>

        <main className="md:col-span-3">
          <div className="space-y-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

/**
 * The container component acting as the entry point for the feature.
 */
export default function Container() {
  return <Page />;
}
