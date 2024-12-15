export type SidebarItem = 
  | {
      type: "item";
      name: string;
      href: string;
      icon: React.ReactNode;
    }
  | {
      type: "separator";
      name: string;
    }
  | {
      type: "label";
      name: string;
    }
  | {
      type: "default";
      name: string;
    }; 