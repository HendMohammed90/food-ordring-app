import { ProductWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";


const Menu = ({ items }: { items: ProductWithRelations[] }) => {

    // console.log(items[0].sizes)

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item: ProductWithRelations) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </ul>
    )
}

export default Menu;
