import { Button } from "@/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card";

type SettingsSidebarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
};

export const SettingsSidebar = ({ activeItem, setActiveItem }: SettingsSidebarProps) => {
  const navItems = ["Profile", "Account", "Notifications"];

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Button
          key={item}
          variant={item === activeItem ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveItem(item)}
        >
          {item}
        </Button>
      ))}
    </nav>
  );
};

export const ProfileSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Manage your public profile settings.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Public profile settings content goes here.</p>
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button>Save Changes</Button>
    </CardFooter>
  </Card>
);

export const MembersSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Members</CardTitle>
      <CardDescription>Manage team members and their permissions.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Members settings content goes here.</p>
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button>Invite Member</Button>
    </CardFooter>
  </Card>
);
