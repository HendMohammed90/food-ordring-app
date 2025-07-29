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

const addToCart = ({ item }: { item: any }) => {
    const [selectedExtras, setSelectedExtras] = useState([]);

    const sizes = [
        {
            id: crypto.randomUUID(),
            name: 'Small',
            price: 10,
        },
        {
            id: crypto.randomUUID(),
            name: 'Medium',
            price: 15,
        },
        {
            id: crypto.randomUUID(),
            name: 'Large',
            price: 20,
        },
    ]

    const extras = [
        {
            id: crypto.randomUUID(),
            name: 'Small',
            price: 0,
        },
        {
            id: crypto.randomUUID(),
            name: 'Medium',
            price: 4,
        },
        {
            id: crypto.randomUUID(),
            name: 'Large',
            price: 8,
        },
    ]
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
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto'">
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
                                sizes={sizes}
                                item={item}
                            />
                        </div>
                        <div className='space-y-4 text-center'>
                            <Label htmlFor='add-extras'>Any extras?</Label>
                            <Extras
                                extras={extras}
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






function PickSize({ sizes, item }: { sizes: any, item: any }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size: any) => (
                <div className="flex items-center gap-3" key={size.id}>
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id}>{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}


function Extras({ extras, selectedExtras, setSelectedExtras }: { extras: any, selectedExtras: any, setSelectedExtras: any }) {
    return (
        extras.map((extra: any) => (
            <div key={extra.id} className="flex items-center space-x-2  rounded-md" >
                <Checkbox id={extra.id} />
                <Label htmlFor={extra.id}
                    className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed">
                    {extra.name}
                </Label>
            </div>
        ))

    )
}
