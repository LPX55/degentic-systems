import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import AnimatedLogo from "@/components/animated-logo";
import { LightLogo, DarkLogo } from '@/components/ui/main-logo'; // Import the logos

export function Logo(props: { className?: string, link?: string }) {
  const { theme } = useTheme();
  return (
    <Link href={props.link ?? '/'} className={cn("items-center space-x-1", props.className)}>
      {theme === 'light' ? <LightLogo /> : <DarkLogo />}
    {/* <DarkLogo /> */}
    </Link>
  );
}
