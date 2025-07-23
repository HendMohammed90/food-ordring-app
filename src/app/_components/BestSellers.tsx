import MainHeading from "@/components/main-heading"
import Menu from "@/components/menu"
import { formatCurrency } from "@/lib/formatters"
import Image from "next/image"


const BestSellers = () => {

    const bestSellerData = [
        {
            id: crypto.randomUUID(),
            name: 'Pizza',
            description: 'This is a Pizza description',
            basePrice: 10,
            image: '/assets/images/pizza-hero.png'
        },
        {
            id: crypto.randomUUID(),
            name: 'Burger',
            description: 'This is a Burger description',
            basePrice: 10,
            image: '/assets/images/pizza-hero.png'
        },
        {
            id: crypto.randomUUID(),
            name: 'Sandwich',
            description: 'This is a Sandwich description',
            basePrice: 10,
            image: '/assets/images/pizza-hero.png'
        },
        {
            id: crypto.randomUUID(),
            name: 'Pasta',
            description: 'This is a Pasta description',
            basePrice: 10,
            image: '/assets/images/pizza-hero.png'
        }
    ]

    return (
        <section>
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading subTitle={'checkout'} title={'Our Best Sellers'} />
                </div>
                <Menu items={bestSellerData} />
            </div>
        </section>
    )
}

export default BestSellers