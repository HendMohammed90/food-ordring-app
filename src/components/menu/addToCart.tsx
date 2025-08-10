'use client'

import { Button, buttonVariants } from "../ui/button"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Extra, Product, Size } from "../../../prisma/generated/prisma"
import { ProductWithRelations } from "@/types/product"


const addToCart = ({ item }: { item: ProductWithRelations }) => {
    const [selectedExtras, setSelectedExtras] = useState([]);
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={`${buttonVariants({
                            size: 'lg', variant: 'outline'
                        })} cursor-pointer space-x-2 !px-8 !rounded-full uppercase bg-chart-5 text-background hover:text-background hover:bg-chart-1 flex items-center justify-between`}
                    >
                        Add to Cart

                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-scroll">
                    <DialogHeader className='flex items-center'>
                        <Image src={item.image} alt={item.name} width={200} height={200} />
                        <DialogTitle>Edit Order</DialogTitle>
                        <DialogDescription className='text-center'>
                            {item.description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className='space-y-10'>
                        <div className='space-y-4 text-center'>
                            <Label htmlFor='pick-size'>Pick your size</Label>
                            <PickSize
                                sizes={item.sizes}
                                item={item}
                            />
                        </div>
                        <div className='space-y-4 text-center'>
                            <Label htmlFor='add-extras'>Any extras?</Label>
                            <Extras
                                extras={item.extras}
                                selectedExtras={selectedExtras}
                                setSelectedExtras={setSelectedExtras}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" className={`${buttonVariants({
                            size: 'lg', variant: 'outline'
                        })} space-x-2 !px-8 !rounded-full w-full uppercase bg-chart-5 text-background hover:text-background hover:bg-chart-1 cursor-pointer`}>Add to cart</Button>
                    </DialogFooter>

                </DialogContent>
            </form>
        </Dialog>
    )
}

export default addToCart






function PickSize({ sizes, item }: { sizes: Size[], item: Product }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size: Size) => (
                <div className="flex flex-row items-center gap-3" key={size.id}>
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id}>{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}


function Extras({ extras, selectedExtras, setSelectedExtras }: { extras: Extra[], selectedExtras: any, setSelectedExtras: any }) {
    return (
        extras.map((extra: any) => (
            <div key={extra.id} className="flex items-center space-x-2  rounded-md" >
                <Checkbox id={extra.id} />
                <Label htmlFor={extra.id}
                    className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed">
                    {extra.name} {formatCurrency(extra.price)}
                </Label>
            </div>
        ))

    )
}
