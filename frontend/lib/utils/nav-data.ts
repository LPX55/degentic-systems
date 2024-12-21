import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    PieChart,
    Settings2,
    SquareTerminal,
    Cpu,
    Database,
    Mic,
    Mic2,
    Scale,
    Users,
    Trophy,
    FileText,
    Settings,
    List,
    Home,
    Clock,
    BarChart,
    Globe,
  } from "lucide-react"

export const data = {
    user: {
      name: "LPX55",
      email: "m@example.com",
      avatar: "/prof.jpg",
    },
    teams: [
      {
        name: "My Workspace",
        logo: GalleryVerticalEnd,
        plan: "Personal",
      },
      {
        name: "Pepe Protocol",
        logo: AudioWaveform,
        plan: "Team Space",
      },
      {
        name: "Uniswap Foundation",
        logo: Cpu,
        plan: "Team Space",
      },
    ],
    navTop: [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
    ],
    navMain: [
      {
        title: "Overview",
        url: "/",
        icon: SquareTerminal,
        isActive: false,
      },
      {
        type: "label",
        icon: List,
        title: "Contest Management",
        isActive: true,
        items: [
          {
            title: "Rounds",
            url: "/rounds",
            icon: Bot,
          },
          {
            title: "Participants",
            url: "/participants",
            icon: BookOpen,
            disabled: true,
            tooltip: "Coming soon - Manage participant profiles and teams",
          },
        ],
      },
      {
        type: "label",
        icon: Bot,
        title: "Agent Development",
        items: [
          {
            title: "Training Hub",
            url: "/training",
            icon: Cpu,
          },
          {
            title: "Knowledge Base",
            url: "/knowledge",
            icon: BookOpen,
          },
          {
            title: "Memory Store",
            url: "/knowledge/memory",
            icon: Database,
          },
        ],
      },
      {
        type: "label",
        icon: Mic,
        title: "Debate Arena",
        isActive: true,
        items: [
          {
            title: "Live Debates",
            url: "/debates/live",
            icon: Mic,
          },
          {
            title: "Practice Stage",
            url: "/debates/practice",
            icon: Mic2,
          },
          {
            title: "Debate History",
            url: "/debates/history",
            icon: Clock,
          },
          {
            title: "Disputes & Appeals",
            url: "/debates/disputes",
            icon: Scale,
          },
        ],
      },
      {
        type: "label",
        icon: Trophy,
        title: "Evaluation & Rewards",
        items: [
          {
            title: "Expert Panel",
            url: "/experts",
            icon: Users,
          },
          {
            title: "Performance",
            url: "/performance",
            icon: BarChart,
            disabled: true,
            tooltip: "Coming soon - Track agent performance metrics",
          },
          {
            title: "Rewards",
            url: "/rewards",
            icon: Trophy,
            disabled: true,
            tooltip: "Coming soon - Manage and distribute rewards",
          },
        ],
      },
      {
        type: "label",
        icon: FileText,
        title: "Resources",
        items: [
          {
            title: "Documentation",
            url: "/docs",
            icon: FileText,
            disabled: true,
            tooltip: "Coming soon - Platform documentation and guides",
          },
          {
            title: "AI Models",
            url: "/models",
            icon: Cpu,
            disabled: true,
            tooltip: "Coming soon - Browse and configure AI models",
          },
        ],
      },
      {
        type: "label",
        icon: Settings,
        title: "Settings",
        items: [
          {
            title: "Configuration",
            url: "/settings",
            icon: Settings,
            disabled: true,
            tooltip: "Coming soon - Platform settings and preferences",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Globe,
      },
    ],
  }
  