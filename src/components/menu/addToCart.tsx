import { Button, buttonVariants } from "../ui/button"
import Image from "next/image"
import {
    Dialog,
    DialogClose,
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

const addToCart = ({ item }: { item: any }) => {

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
                <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto'">
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
                            />
                        </div>
                        {/* <div className='space-y-4 text-center'>
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
                        </div> */}
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default addToCart






function PickSize({ sizes }: { sizes: any }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size: any) => (
                <div className="flex items-center gap-3" key={size.id}>
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id}>{size.name}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}
