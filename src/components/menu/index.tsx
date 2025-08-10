import { ProductWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";


const Menu = ({ items }: { items: ProductWithRelations[] }) => {

    // console.log(items[0].sizes)

    return items.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item: ProductWithRelations) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </ul>
    ) : (
        <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No menu items available at the moment.</p>
            <p className="text-sm text-muted-foreground mt-2">Please check back later!</p>
        </div>
    )
}

export default Menu;
