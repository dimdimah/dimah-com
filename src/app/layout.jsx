import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import ThemeSwitcher from "@/components/theme-switcher";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dimah Luthfi - Frontend Web Developer",
  description: "web portofolio dimah luthfi",
  icons: {
    icon: "/icon-dimah.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className={geistSans.className} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex items-center flex-col dark:bg-[#030303] bg-[#FBFBFB]">
              <nav className="container max-w-3xl mt-6 flex flex-row items-center gap-4 justify-between">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center text-base">
                    <Link href={"/"} className="hover:text-lime-700">
                      home
                    </Link>
                    <Link href={"/blog"} className="hover:text-lime-700">
                      blog
                    </Link>
                    <Link href={"/contact"} className="hover:text-lime-700">
                      contact
                    </Link>
                  </div>
                  <ThemeSwitcher />
                </div>
              </nav>
              <div className="pt-12 pb-32 antialiased p-3 px-5">
                {children}
                <Toaster />
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
