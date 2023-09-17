import { ReactNode } from "react";

export type MenuItemProps = {
  id: string;
  label: ReactNode;
  children?: MenuItemProps[];
  visible: boolean; 
};

export type MenuListProps = {
  data: MenuItemProps[];
};

export type MenuActions = {
  addLevel: (parentId: string) => void;
  deleteLevel: (id: string) => void;
  toggleVisibility: (id: string) => void;
  moveItem: (itemId: string, newIndex: number) => void;
};
