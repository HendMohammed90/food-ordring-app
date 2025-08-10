import { formatCurrency } from "@/lib/formatters"
import Image from 'next/image';
import AddToCart from "./addToCart";
import { ProductWithRelations } from "@/types/product";


const MenuItem = ({ item }: { item: ProductWithRelations }) => {
    return (
        <li key={item.id}>
            <div className="relative w-48 h-48 mx-auto">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-xl my-3">{item.name}</h4>
                <strong className="text-primary">
                    {formatCurrency(item.basePrice)}
                </strong>
            </div>
            <div className='text-sm text-muted-foreground line-clamp-3'>
                <p>{item.description}</p>
            </div>
            <AddToCart item={item} />
        </li>)
}

export default MenuItem