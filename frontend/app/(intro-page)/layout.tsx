import { Footer } from "@/components/footer";
import { Header } from "@/components/layout";

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Ideology", href: "/#ethos" },
  { title: "Features", href: "/#features" },
  { title: "Github", href: "https://github.com/LPX55/degentic-systems", external: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header items={navigationItems} />
      <main className="flex-1">{children}</main>
      <Footer
        builtFor="Onboard @ Taipei 2024"
        builtForLink="https://www.taipeiblockchainweek.com/"
        githubLink="https://x.com/stealth4now"
        twitterLink="https://twitter.com/LPX_404"
        linkedinLink="https://www.linkedin.com/in/hanyoon1/"
      />
    </div>
  );
}