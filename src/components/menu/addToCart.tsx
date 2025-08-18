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
import { Extra, Product, Size, ProductSize } from "../../../prisma/generated/prisma"
import { ProductWithRelations } from "@/types/product"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addToCart, clearCart, removeFromCart, selectCartItems } from "@/redux/cartSlice"
import { AppDispatch } from "@/redux/store"



const AddToCart = ({ item }: { item: ProductWithRelations }) => {
    const cart = useAppSelector(selectCartItems);
    const dispatch = useAppDispatch<AppDispatch>();

    const defaultSize = cart.find((element) => element.id === item.id)?.size
        || item.sizes.find((size) => size.name === ProductSize.SMALL);
    const defaultExtras =
        cart.find((element) => element.id === item.id)?.extraIngredients || [];
    const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
    const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

    let totalPrice = item.basePrice;

    if (selectedSize) {
        totalPrice += selectedSize.price;
    }

    if (selectedExtras.length > 0) {
        for (const extra of selectedExtras) {
            totalPrice += extra.price
        }
    }

    const handelAddToCart = () => {
        dispatch(addToCart({
            basePrice: item.basePrice,
            id: item.id,
            image: item.image,
            name: item.name,
            size: selectedSize,
            extraIngredients: selectedExtras,
        }))
        console.log(cart)
    }

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
                                selectedSize={selectedSize}
                                setSelectedSize={setSelectedSize}
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
                        })} space-x-2 !px-8 !rounded-full w-full uppercase bg-chart-5 text-background hover:text-background hover:bg-chart-1 cursor-pointer`}
                            onClick={handelAddToCart}
                        >Add to cart {formatCurrency(totalPrice)}</Button>
                    </DialogFooter>

                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddToCart






function PickSize({ sizes, item, selectedSize, setSelectedSize }:
    {
        sizes: Size[],
        item: Product,
        selectedSize: Size,
        setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
    }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size: Size) => (
                <div className="flex flex-row items-center gap-3" key={size.id}>
                    <RadioGroupItem value={selectedSize.name} checked={selectedSize.id === size.id} id={size.id} onClick={() => setSelectedSize(size)} />
                    <Label htmlFor={size.id}>{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}


function Extras({ extras, selectedExtras, setSelectedExtras }:
    {
        extras: Extra[],
        selectedExtras: Extra[],
        setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>
    }) {

    const handelSelectedExtras = (extra: Extra) => {
        if (selectedExtras.find((e) => e.id === extra.id)) {
            const filteredSelectedExtras = selectedExtras.filter((item) => item.id !== extra.id);
            setSelectedExtras(filteredSelectedExtras)
        } else {
            setSelectedExtras((prev) => [...prev, extra]);
        }
    }
    return (
        extras.map((extra: any) => (
            <div key={extra.id} className="flex items-center space-x-2  rounded-md" >
                <Checkbox id={extra.id} checked={Boolean(selectedExtras.find((e) => e.id === extra.id))} onClick={() => handelSelectedExtras(extra)} />
                <Label htmlFor={extra.id}
                    className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed">
                    {extra.name} {formatCurrency(extra.price)}
                </Label>
            </div>
        ))

    )
}
