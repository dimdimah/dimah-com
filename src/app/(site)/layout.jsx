import AnnouncementBar from "@/components/site/announcement-bar";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { profileData } from "@/data/home";

export default function SiteLayout({ children }) {
  const cvUrl =
    profileData.cv_url ||
    profileData.links?.find((l) => l.text === "CV")?.url ||
    "/admin.pdf";

  return (
    <div className="min-h-screen bg-bg text-foreground antialiased selection:bg-accent-1/20 dark:selection:bg-accent-1/30">
      <AnnouncementBar />
      <SiteHeader cvUrl={cvUrl} />

      <main>{children}</main>

      <SiteFooter />
    </div>
  );
}
