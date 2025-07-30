type SideBarItemChild = {
  name: string;
  route: string;
  icon?: React.ReactNode;
  adminOnly?: boolean;
};

type SideBarItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
  children?: SideBarItemChild[];
  adminOnly?: boolean;
};

type NavItemProps = {
  nav: SideBarItem;
  path: string;
};
