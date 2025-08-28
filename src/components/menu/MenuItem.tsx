import { formatCurrency } from "@/lib/formatters"
import Image from 'next/image';

import { ProductWithRelations } from "@/types/product";
import AddToCart from "./addToCart";


const MenuItem = ({ item }: { item: ProductWithRelations }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 max-w-sm w-full">
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="( max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    property="false"
                />
            </div>
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-lg leading-tight">{item.name}</h4>
                    <strong className="text-primary text-lg ml-2 flex-shrink-0">
                        {formatCurrency(item.basePrice)}
                    </strong>
                </div>
                <div className='text-sm text-muted-foreground line-clamp-2'>
                    <p>{item.description}</p>
                </div>
                <AddToCart item={item} />
            </div>
        </div>
    )
}

export default MenuItem