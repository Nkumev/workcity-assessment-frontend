type SideBarItemChild = {
  name: string;
  route: string;
  icon?: React.ReactNode;
};

type SideBarItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
  children?: SideBarItemChild[];
};

type NavItemProps = {
  nav: SideBarItem;
  path: string;
};
