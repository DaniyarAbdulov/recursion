import { MenuItemProps } from "../../types/types";

const Menuitem = ({id, label, children}:MenuItemProps) => {
    return <div>
        <div>
        <span>{id}</span>
        <span>{label}</span>
        </div>
        {children && 
        children.map((item, key) =>(
            <Menuitem {...item} key={`menuItem-${item.label}-${key}`}/>
        ))}
    </div>
}

export default Menuitem;