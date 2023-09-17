import React from 'react';
import { MenuListProps, MenuActions } from '../../types/types';
import Menuitem from '../MenuItem/MenuItem';

const MenuList = ({ data, addLevel, deleteLevel, toggleVisibility, moveItem }: MenuListProps & MenuActions) => {
  return (
    <>
      {data && data.map((e, i) => (
        <Menuitem {...e} key={`parent-MenuItem-${i}`} />
      ))}
      {!data && (
        <div>
          No Data So far!
        </div>
      )}
    </>
  );
};

export default MenuList;
